import { z } from 'zod' 


export const genreSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
})

export const createGenreSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})
