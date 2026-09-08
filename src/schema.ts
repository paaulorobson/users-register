import { z } from "zod";

export const userRegisterSchema = z
  .object({
    fullName: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação de senha deve ter no mínimo 6 caracteres",
    }),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
    cep: z.string().regex(/^\d{5}-\d{3}$/, { message: "CEP inválido" }),
    address: z.string().min(1, { message: "O endereço é obrigatório" }),
    city: z.string().min(1, { message: "A cidade é obrigatória" }),
    uf: z.string().min(2, { message: "O estado é obrigatório" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você deve aceitar os termos e condições",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
