import { z } from 'zod'
import { imageTypes } from './utils'

export const UserSchema = z.object({
  id: z.string(),
  collectionId: z.string(),
  collectionName: z.string(),
  username: z.string(),
  verified: z.boolean(),
  emailVisibility: z.boolean(),
  email: z.string().email(),
  created: z.preprocess((arg) => new Date(arg), z.date()),
  updated: z.preprocess((arg) => new Date(arg), z.date()),
  avatar: z.string().optional(),
  name: z.string(),
  division: z.string(),
  job_title: z.string(),
  favorites: z.array(z.string()),
  likes: z.array(z.string()),
  following: z.array(z.string()),
  badges: z.array(z.string()),
  post: z.string().optional(),
  last_login: z.preprocess((arg) => new Date(arg), z.date()).optional(),
})

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email.' }),
  password: z.string({ required_error: 'Password is required' }),
})

export const registerUserSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email must be a valid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.',
      }),
    passwordConfirm: z
      .string({ required_error: 'Confirm Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.',
      }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password & Confirm password must match',
        path: ['password'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password & Confirm password must match',
        path: ['passwordConfirm'],
      })
    }
  })

export const updateEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email' }),
})

export const updateUsernameSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(24, { message: 'Username must be 24 characters or less' })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Username can only contain letters or numbers.',
    }),
})

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.',
      }),
    passwordConfirm: z
      .string({ required_error: 'Confirm Password is required' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.',
      }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password & Confirm password must match',
        path: ['password'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password & Confirm password must match',
        path: ['passwordConfirm'],
      })
    }
  })

export const updateProfileSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name is required' })
    .max(64, { message: 'Name must be 64 characters or less' })
    .trim(),

  job_title: z
    .string({ required_error: 'Job Title is required' })
    .min(1, { message: 'Job Title is required' })
    .max(64, { message: 'Job Title must be 64 characters or less' })
    .trim(),

  avatarFile: z.instanceof(Blob).optional(),
  avatarUrl: z.string().url().optional(),
})

export type User = z.infer<typeof UserSchema>