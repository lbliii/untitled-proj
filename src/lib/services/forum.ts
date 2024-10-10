// src/lib/services/forumService.ts
import { pb } from '$lib/pocketbase'
import { forumSchema, forumResponseSchema } from '$lib/schemas/forum'
import { ZodError } from 'zod'

export async function createForum(data: any) {
  try {
    const validatedData = forumSchema.parse(data)
    const record = await pb.collection('forums').create(validatedData)
    return record
  } catch (error) {
    throw error
  }
}

export async function updateForum(id: string, data: any) {
  try {
    const validatedData = forumSchema.parse(data)
    const record = await pb.collection('forums').update(id, validatedData)
    return record
  } catch (error) {
    throw error
  }
}

export async function deleteForum(id: string) {
  try {
    await pb.collection('forums').delete(id)
  } catch (error) {
    throw error
  }
}

export async function getForum(
  identifier: string,
  page: number,
  perPage: number,
) {
  try {
    // Fetch forum data
    const forum = await pb.collection('forums').getOne(identifier, {
      expand: 'genre,subforums,owner',
    })

    // Validate forum data
    const validatedForum = forumSchema.parse(forum)

    // Fetch threads
    const threads = await pb.collection('threads').getList(page, perPage, {
      filter: `forum="${forum.id}"`,
      sort: '-created',
      expand: 'author',
    })

    // Validate threads
    const validatedThreads = threads.items.map((thread) =>
      threadSchema.parse(thread),
    )

    // Structure response
    return {
      forum: validatedForum,
      threads: validatedThreads,
      currentPage: page,
      totalPages: Math.ceil(threads.totalItems / perPage),
    }
  } catch (error) {
    throw error
  }
}
