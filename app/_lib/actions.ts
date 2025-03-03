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

export async function createAnnouncement(formData: FormData) {
  const main_image = formData.get("main_image") as File | null;
  const images = formData.getAll("images") as File[] | null;
  const name = formData.get("name") as string | null;
  const age = formData.get("age") as number | null;
  const animal = formData.get("animal") as string | null;
  const description = formData.get("description") as string | null;
  const gender = formData.get("gender") as string | null;

  if (
    !main_image ||
    !images ||
    !name ||
    !age ||
    !animal ||
    !description ||
    !gender
  ) {
    throw new Error("Podano błędne dane w formularzu");
  }

  const mainImageName = `${Math.random()}-${main_image.name}`.replaceAll(
    "/",
    "",
  );

  console.log(Object.keys(formData));

  const mainImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/announcements-images/${mainImageName}`;

  const imagesNames: string[] = []
  const imagesPaths = images.map((image) => {
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagesNames.push(imageName)
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/announcements-images/${imageName}`;
  });

  const supabase = await serverClient();

  const { error } = await supabase.from("announcements").insert({
    name,
    age,
    animal,
    description,
    gender,
    images: imagesPaths,
    main_image: mainImagePath,
  });

  if (error) console.log(error);

  const { error: storageError } = await supabase.storage
    .from("announcements-images")
    .upload(mainImageName, main_image);
  if (storageError) {
    console.log(error);
  }

  imagesNames.forEach(async (name, i) => {
    const { error: storageError } = await supabase.storage
      .from("announcements-images")
      .upload(name, images[i]);
    if (storageError) {
      console.log(error);
    }
  });
}
