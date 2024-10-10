import { z } from 'zod'


export const threadSchema = z.object({
  forum: z.string(),
  user: z.string(),
  title: z.string().min(1, 'Title is required'),
  last_post_at: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()).optional(),
})

export const threadPostSchema = z.object({
  thread: z.string(),
  user: z.string(),
  character: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  word_count: z.number().optional(),
})


export type Thread = z.infer<typeof threadSchema>
export type ThreadPost = z.infer<typeof threadPostSchema>
