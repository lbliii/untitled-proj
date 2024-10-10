import { z } from 'zod'
import { threadSchema } from './thread'
import { genreSchema } from './genre'

export const forumSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  genre: z.string().optional(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()).optional().default(new Date()),
  slug: z.string().optional().default(''),
  owner: z.string().nullable(),
  parent_forum: z.string().nullable(),
  expand: z.object({
    genre: genreSchema,
  }).optional()
})

export const subforumSchema = forumSchema.extend({
  parent_forum: z.string(),
})

export const forumResponseSchema = z.object({
  forum: forumSchema,
  subforums: z.array(forumSchema),
  threads: z.array(threadSchema),
  currentPage: z.number(),
  totalPages: z.number(),
})

export const forumListSchema = z.array(forumSchema)

export const forumsResponseSchema = z.object({
  forums: forumListSchema
})

export const paginatedForumListSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  items: forumListSchema,
})

export const createForumSchema = z.object({
  genre: z.string().min(1, 'Genre is required'),
  parent_forum: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.instanceof(Blob).optional(),
  premise: z.string().optional(),
  guidelines: z.string().optional(),
  owner: z.string().min(1, 'Owner is required'),
  slug: z.string().min(1, 'Slug is required')
})


export const updateForumSchema = createForumSchema.partial().refine(
  (data) => {
    // Ensure that at least one field is being updated
    return Object.keys(data).length > 0
  },
  {
    message: 'At least one field must be updated',
  },
)

export type Forum = z.infer<typeof forumSchema>