import { z } from 'zod'

export const createWantedAdSchema = z.object({
  user: z.string(),
  forum: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(['open', 'closed', 'filled']).optional(),
})
