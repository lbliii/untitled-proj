import { z } from 'zod'

export const createWantedAdSchema = z.object({
  user: z.string(),
  forum: z.string(),
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(['open', 'closed', 'filled']).optional(),
})
