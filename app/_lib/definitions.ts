import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Proszę wprowadzić poprawny e-mail." })
    .trim(),
  password: z
    .string({
      required_error: "Podaj hasło",
    })
    .trim(),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Hasło musi mieć przynajmniej 8 znaków" })
  .max(20, { message: "Hasło musi mieć maksymalnie 20 znaków" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Hasło musi mieć przynajmniej jedną wielką literę.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Hasło musi mieć przynajmniej jedną małą literę.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Hasło musi mieć przynajmniej jedą liczbę.",
  });

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same.",
  });

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    authStatus?: string;
  };
} | null;
