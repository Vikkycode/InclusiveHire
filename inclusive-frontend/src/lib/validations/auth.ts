import * as z from "zod"

export const loginSchema = z.object({
  email: z.string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email is required.",
    }),
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(100)
})

export const registerSchema = z.object({
  name: z.string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  email: z.string()
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  role: z.enum(['JOBSEEKER', 'EMPLOYER', 'ADMIN']),
})

export const resetPasswordSchema = z.object({
  email: z.string()
    .email({
      message: "Please enter a valid email address.",
    })
})

export const newPasswordSchema = z.object({
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})