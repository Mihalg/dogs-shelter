"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  LoginFormSchema,
  LoginFormState,
  updatePasswordSchema,
} from "../_lib/definitions";
import { serverClient } from "../_utils/supabase/server";

//----------USER MANAGEMENT---------

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        email: validatedFields.error.flatten().fieldErrors.email ?? [],
        password: validatedFields.error.flatten().fieldErrors.password ?? [],
      },
    };
  }

  const { data } = validatedFields;
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return { errors: { authStatus: "Niepoprawne dane logowania" } };
  } else {
    return redirect("/admin/panel");
  }
}

export async function changePassword(
  state: {
    messages: {
      password?: string[];
      confirmPassword?: string[];
      status?: string;
    };
  } | null,
  formData: FormData,
) {
  const validatedFields = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      messages: {
        password: validatedFields.error.flatten().fieldErrors.password ?? [],
        confirmPassword: validatedFields.error.flatten().formErrors ?? [],
      },
    };
  }

  const supabase = await serverClient();
  const { error } = await supabase.auth.updateUser({
    password: validatedFields.data.password,
  });

  if (error) {
    console.log(error);
    return { messages: { status: "Wystąpił błąd." } };
  } else {
    return { messages: { status: "Zmieniono hasło." } };
  }
}

export async function logout() {
  const supabase = await serverClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  redirect("/admin");
}

//----------ANNOUNCEMENTS---------
export async function createEditAnnouncement(formData: FormData) {
  const id = formData.get("id") as string | null;
  const main_image = formData.get("main_image") as File | null;
  const images = formData.getAll("images") as File[] | null;
  const name = formData.get("name") as string | null;
  const age = formData.get("age") as number | null;
  const breed = formData.get("breed") as string | null;
  const description = formData.get("description") as string | null;
  const sex = formData.get("sex") as string | null;

  if (
    !main_image ||
    !images?.length ||
    !name ||
    !age ||
    !breed ||
    !description ||
    !sex
  ) {
    throw new Error("Podano błędne dane w formularzu");
  }

  const supabase = await serverClient();
  if (!id) {
    // if !id user is adding new announcement
    const { data, error } = await supabase
      .from("announcements")
      .insert({
        name,
        age,
        breed,
        description,
        sex,
        images: null,
        main_image: null,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    addImages(data.id);
  } else {
    //If id user is editing existing announcement
    const { data, error } = await supabase
      .from("announcements")
      .update({
        name,
        age,
        breed,
        description,
        sex,
      })
      .eq("id", +id)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    //Deleting old images and replacing them with new from formData
    const { success: mainFolderSucces, message: mainFolderMessage } =
      await deleteFolder("announcements-images", `${data.id}/main`);

    if (!mainFolderSucces) throw new Error(mainFolderMessage);

    const {
      success: additionalImagesSucces,
      message: additionalImagesMessage,
    } = await deleteFolder("announcements-images", `${data.id}`);

    if (!additionalImagesSucces) throw new Error(additionalImagesMessage);

    addImages(data.id);
  }

  async function addImages(id: number) {
    const mainImageName = main_image?.name.replaceAll("/", "");
    const imagesNames: string[] = [];

    //Generating paths for images
    const mainImagePath: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/announcements-images/${id}/main/${mainImageName}`;
    const imagesPaths = images?.map((image) => {
      const imageName = `${image.name}`.replaceAll("/", "");
      imagesNames.push(imageName);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/announcements-images/${id}/${imageName}`;
    });

    //Updating row with images paths in storage
    const { error: imagesError } = await supabase
      .from("announcements")
      .update({
        images: imagesPaths,
        main_image: mainImagePath,
      })
      .eq("id", id);

    if (imagesError) {
      console.log(imagesError);
      throw new Error("Nie udało się dodać ogłoszenia");
    }

    //Adding main image to storage
    const { error: mainImageError } = await supabase.storage
      .from("announcements-images")
      .upload(`/${id}/main/${mainImageName}`, main_image!);
    if (mainImageError) {
      console.log("Add main image error:", mainImageError);
    }

    //Adding additional images to storage
    imagesNames.forEach(async (name, i) => {
      const { error: imagesError } = await supabase.storage
        .from("announcements-images")
        .upload(`/${id}/${name}`, images![i]);
      if (imagesError) {
        console.log("Add aditional images error:", imagesError);
      }
    });

    const uploadPromises = imagesNames.map(async (name, i) => {
      return supabase.storage
        .from("announcements-images")
        .upload(`/${id}/${name}`, images![i])
        .then(({ error }) => {
          if (error) {
            console.error("Upload error:", error);
          }
          return { name, error };
        });
    });

    const uploadResults = await Promise.all(uploadPromises);

    const failedUploads = uploadResults.filter((r) => r.error);
    if (failedUploads.length > 0) {
      console.log("Some uploads failed:", failedUploads);
    } else {
      console.log("All images uploaded successfully!");
    }
  }

  revalidatePath("/admin/panel/ogloszenia");

  return true;
}

export async function deleteAnnouncement(id: number) {
  const supabase = await serverClient();

  //Delete row from database
  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  //Delete images from storage
  const { success: mainFolderSucces, message: mainFolderMessage } =
    await deleteFolder("announcements-images", `${id}/main`);

  if (!mainFolderSucces) throw new Error(mainFolderMessage);

  const { success, message } = await deleteFolder(
    "announcements-images",
    `${id}`,
  );

  if (!success) throw new Error(message);

  revalidatePath("/admin/panel/ogloszenia");
}

//----------POSTS---------

export async function createEditPost(formData: FormData) {
  const id = formData.get("id") as string | null;
  const type = formData.get("type") as string | null;
  const link = formData.get("link") as string | null;
  const image = formData.get("image") as File | null;
  const content = formData.get("content") as string | null;
  const title = formData.get("title") as string | null;

  if (!type) throw new Error("Wystąpił nieoczekiwany błąd");

  const supabase = await serverClient();
  if (!id) {
    //if !id user is adding new post
    const { data, error } = await supabase
      .from("posts")
      .insert({ type, link, content, title, image: null })
      .select()
      .single();

    if (error) {
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    addImage(data?.id);
  } else {
    //If id user is editing existing announcement

    const { data, error } = await supabase
      .from("posts")
      .update({ type, link, content, title })
      .eq("id", +id)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    //Deleting old images and replacing them with new from formData
    const { success, message } = await deleteFolder(
      "posts-images",
      `${data.id}`,
    );

    if (!success) throw new Error(message);

    if (!link) addImage(data.id);
  }

  async function addImage(id: number) {
    const imageName = image?.name.replaceAll("/", "");
    const imagePath: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/posts-images/${id}/${imageName}`;

    const { error: imageError } = await supabase
      .from("posts")
      .update({
        image: imagePath,
      })
      .eq("id", id);

    if (imageError) {
      console.log(imageError);
      throw new Error("Nie udało się dodać ogłoszenia");
    }

    //Adding main image to storage
    const { error: storageError } = await supabase.storage
      .from("posts")
      .upload(`/${id}/${imageName}`, image!);
    if (storageError) {
      console.log("Add image error:", storageError);
    }
  }

  revalidatePath("/admin/panel/aktualnosci");
}

export async function deletePost(id: number) {
  const supabase = await serverClient();

  //Delete row from database
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  //Delete image from storage
  const { success, message } = await deleteFolder("posts-images", `${id}`);

  if (!success) throw new Error(message);

  revalidatePath("/admin/panel/aktualnosci");
}

//----------EVENTS---------
export async function createEditEvent(formData: FormData) {
  const id = formData.get("id") as string | null;
  const image = formData.get("image") as File | null;
  const content = formData.get("content") as string | null;
  const title = formData.get("title") as string | null;

  if (!image || !content || !title)
    throw new Error("Podano błędne dane formularza");

  const supabase = await serverClient();
  if (!id) {
    //if !id user is adding new event
    const { data, error } = await supabase
      .from("events")
      .insert({ content, title, image: null })
      .select()
      .single();

    if (error) {
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    addImage(data?.id);
  } else {
    //If id user is editing existing announcement

    const { data, error } = await supabase
      .from("posts")
      .update({ content, title })
      .eq("id", +id)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    //Deleting old images and replacing them with new from formData
    const { success, message } = await deleteFolder(
      "events-images",
      `${data.id}`,
    );

    if (!success) throw new Error(message);

    addImage(data.id);
  }

  async function addImage(id: number) {
    const imageName = image?.name.replaceAll("/", "");
    const imagePath: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events-images/${id}/${imageName}`;

    const { error: imageError } = await supabase
      .from("posts")
      .update({
        image: imagePath,
      })
      .eq("id", id);

    if (imageError) {
      console.log(imageError);
      throw new Error("Nie udało się dodać wydarzenia");
    }

    //Adding main image to storage
    const { error: storageError } = await supabase.storage
      .from("events-images")
      .upload(`/${id}/${imageName}`, image!);
    if (storageError) {
      console.log("Add image error:", storageError);
    }
  }

  revalidatePath("/admin/panel/wydarzenia");
}

export async function deleteEvent(id: number) {
  const supabase = await serverClient();

  //Delete row from database
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  //Delete image from storage
  const { success, message } = await deleteFolder("events", `${id}`);

  if (!success) throw new Error(message);

  revalidatePath("/admin/panel/wydarzenia");
}

//----------FUNDRAISERS---------
export async function createEditFundraiser(
  formState: { message: string } | null,
  formData: FormData,
) {
  const id = formData.get("id") as string | null;
  const link = formData.get("link") as string | null;

  if (!link) {
    return {
      message: "Wypełnij formularz",
    };
  }

  const supabase = await serverClient();

  if (!id) {
    //if !id user is adding new fundraiser
    const { error } = await supabase.from("fundraisers").insert({ link });
    if (error) {
      console.log(error);
      return { message: "Wystąpił błąd" };
    } else {
      redirect("/admin/panel/zbiorki");
    }
  } else {
    const { error } = await supabase
      .from("fundraisers")
      .update({ link })
      .eq("id", +id);
    if (error) {
      console.log(error);
      return { message: "Wystąpił błąd" };
    } else {
      redirect("/admin/panel/zbiorki");
    }
  }
}

export async function deleteFundraiser(id: number) {
  const supabase = await serverClient();

  //Delete row from database
  const { error } = await supabase.from("fundraisers").delete().eq("id", id);

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  revalidatePath("/admin/panel/zbiorki");
}

//----------EXPENSES---------
export async function createEditExpense(formData: FormData) {
  const id = formData.get("id") as string | null;
  const images = formData.getAll("images") as File[] | null;
  const title = formData.get("title") as string | null;

  if (!images || !title) throw new Error("Podano błędne dane formularza");

  const supabase = await serverClient();
  if (!id) {
    //if !id user is adding new event
    const { data, error } = await supabase
      .from("expenses")
      .insert({ title, images: null })
      .select()
      .single();

    if (error) {
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    addImage(data?.id);
  } else {
    //If id user is editing existing expense
    const { data, error } = await supabase
      .from("expenses")
      .update({ title })
      .eq("id", +id)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Wystąpił nieoczekiwany błąd...");
    }

    // Deleting old images and replacing them with new from formData
    const { success, message } = await deleteFolder(
      "expenses-images",
      `${data.id}`,
    );

    if (!success) throw new Error(message);

    addImage(data.id);
  }

  async function addImage(id: number) {
    const imagesNames: string[] = [];
    const imagesPaths = images?.map((image) => {
      const imageName = `${image.name}`.replaceAll("/", "");
      imagesNames.push(imageName);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/expenses-images/${id}/${imageName}`;
    });

    //Updating row with images paths in storage
    const { error: imageError } = await supabase
      .from("expenses")
      .update({
        images: imagesPaths,
      })
      .eq("id", id);

    if (imageError) {
      console.log(imageError);
      throw new Error("Nie udało się dodać wydarzenia");
    }

    //Adding images to storage
    imagesNames.forEach(async (name, i) => {
      const { error: imagesError } = await supabase.storage
        .from("expenses-images")
        .upload(`/${id}/${name}`, images![i]);
      if (imagesError) {
        console.log("Add images error:", imagesError);
      }
    });
  }

  revalidatePath("/admin/panel/wydatki");
}

export async function deleteExpense(id: number) {
  const supabase = await serverClient();

  //Delete row from database
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  //Delete image from storage
  const { success, message } = await deleteFolder("expenses-images", `${id}`);

  if (!success) throw new Error(message);

  revalidatePath("/admin/panel/wydatki");
}

export async function deleteFolder(bucketName: string, folderPath: string) {
  const supabase = await serverClient();
  // Download all files in folder
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath);

  if (error) {
    console.error("Błąd pobierania plików:", error);
    return { success: false, message: "Nie udało się pobrać plików" };
  }

  if (!data || data.length === 0) {
    return { success: true, message: "Folder jest pusty lub nie istnieje" };
  }

  // List of paths to delete
  const filesToDelete = data.map((file) => `${folderPath}/${file.name}`);

  // Delete files
  const { error: deleteError } = await supabase.storage
    .from(bucketName)
    .remove(filesToDelete);

  if (deleteError) {
    console.error("Błąd usuwania plików:", deleteError);
    return { success: false, message: "Nie udało się usunąć plików" };
  }

  return { success: true, message: `Folder "${folderPath}" został usunięty` };
}
