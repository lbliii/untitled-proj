import { z } from 'zod'

export const createGuestBookPostSchema = z.object({
  author: z.string(),
  content: z
    .string({ required_error: 'Text area content is required' })
    .min(1, { message: 'Text area content cannot be empty.' })
    .max(250, { message: 'Text area content cannot exceed 250 characters.' }),
})

export const likeGuestBookPostSchema = z.object({
  postId: z.string(),
  currentUserId: z.string(),
})