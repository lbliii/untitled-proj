import { z } from 'zod'

export const forumSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  genre: z.string().nullable(),
  createdAt: z.string().optional(),
  slug: z.string().optional(),
  owner: z.string().nullable()  // Allow null values for owner
})

export const subforumSchema = forumSchema.extend({
  parent_forum: z.string(),
})

export const forumResponseSchema = z.object({
  forum: forumSchema.extend({
    subforums: z.array(subforumSchema).optional(),
  }),
})

export const forumListSchema = z.array(forumSchema)

export const forumsResponseSchema = z.object({
  forums: forumListSchema,
})

export const paginatedForumListSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  items: forumListSchema,
})

export const createForumSchema = z.object({
  genre: z.string().optional(),
  parent_forum: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  is_global: z.boolean().optional(),
  image: z.instanceof(Blob).optional(),
  premise: z.string().optional(),
  guidelines: z.string().optional(),
  owner: z.string().optional()
})
