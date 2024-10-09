import { z } from 'zod'

export const createThreadSchema = z.object({
  forum: z.string(),
  user: z.string(),
  title: z.string().min(1, 'Title is required'),
  last_post_at: z.date().optional(),
})

export const createThreadPostSchema = z.object({
  thread: z.string(),
  user: z.string(),
  character: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  word_count: z.number().optional(),
})