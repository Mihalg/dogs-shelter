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
