import { z } from 'zod'
import { threadSchema } from './threadSchemas'
import { genreSchema } from './genreSchemas'

export const forumSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  genre: z.string().or(genreSchema).nullable().optional(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()).optional().default(new Date()),
  slug: z.string().optional().default(''),
  owner: z.string().nullable(),
  parent_forum: z.string().nullable()
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
  user: z.any().optional() // You might want to create a proper user schema
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

export type Forum = z.infer<typeof forumSchema>