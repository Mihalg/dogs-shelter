"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormState, LoginFormSchema } from "../_lib/definitions";
import { serverClient } from "../_utils/supabase/server";

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/admin/panel");
}

export async function logout() {
  const supabase = await serverClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Wystąpił nieoczekiwany błąd");

  redirect("/admin");
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

  // List of path to delete
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
    !images ||
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
    
    await supabase.storage.from("announcements-images").remove([`${id}`]);
    // const { success, message } = await deleteFolder(
    //   "announcements-images",
    //   `${data.id}`,
    // );

    // if (!success) throw new Error(message);

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
      console.log(mainImageError);
    }
    
    //Adding additional images to storage
    imagesNames.forEach(async (name, i) => {
      const { error: imagesError } = await supabase.storage
        .from("announcements-images")
        .upload(`/${id}/${name}`, images![i]);
      if (imagesError) {
        console.log(imagesError);
      }
    });
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
