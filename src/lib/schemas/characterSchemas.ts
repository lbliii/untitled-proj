import { z } from 'zod'

export const createCharacterSchema = z.object({
  user: z.string(),
  name: z.string().min(1, 'Name is required'),
  biography: z.string().optional(),
  avatar: z.instanceof(Blob).optional(),
  soul_type: z.string().optional(),
  species: z.string().optional(),
  class: z.string().optional(),
  is_approved: z.boolean().optional(),
})