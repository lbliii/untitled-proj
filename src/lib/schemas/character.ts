import { z } from 'zod'

export const createCharacterSchema = z.object({
  user: z.string(),
  name: z.string().min(1, 'Name is required'),
  biography: z.string().optional(),
  avatar: z
    .instanceof(Blob)
    .optional()
    .superRefine((val, ctx) => {
      if (val) {
        if (val.size > 5242880) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Avatar must be less than 5MB',
          })
        }
        if (!imageTypes.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif',
          })
        }
      }
    }),
  soul_type: z.enum(['Type1', 'Type2']).optional(),
  species: z.enum(['Species1', 'Species2']).optional(),
  class: z.string().optional(),
  is_approved: z.boolean().optional(),
})