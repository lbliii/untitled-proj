// src/lib/services/forum.ts
import { forumSchema, createForumSchema, updateForumSchema, forumResponseSchema } from '$lib/schemas/forum'
import { ZodError } from 'zod'
import type { Forum } from '$lib/schemas/forum'
import type PocketBase from 'pocketbase'

// Update function signatures to accept `pb` as a parameter
export async function createForum(pb: PocketBase, data: any) {
  try {
    const validatedData = createForumSchema.parse(data)
    const record = await pb.collection('forums').create(validatedData)
    return forumSchema.parse(record)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

export async function updateForum(pb: PocketBase, id: string, data: any) {
  try {
    const validatedData = updateForumSchema.parse(data)
    const record = await pb.collection('forums').update(id, validatedData)
    return forumSchema.parse(record)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

export async function deleteForum(pb: PocketBase, id: string) {
  try {
    await pb.collection('forums').delete(id)
  } catch (error) {
    throw error
  }
}

export async function getForum(
  pb: PocketBase,
  identifier: string,
  page: number,
  perPage: number,
) {
  try {
    const forum = await pb.collection('forums').getOne(identifier, {
      expand: 'genre,subforums,owner',
    })
    const validatedForum = forumSchema.parse(forum)

    const threads = await pb.collection('threads').getList(page, perPage, {
      filter: `forum="${forum.id}"`,
      sort: '-created',
      expand: 'author',
    })
    const validatedThreads = threads.items.map((thread) =>
      threadSchema.parse(thread),
    )

    const response = {
      forum: validatedForum,
      subforums: forum.subforums ? forum.subforums.map((sub) => forumSchema.parse(sub)) : [],
      threads: validatedThreads,
      currentPage: page,
      totalPages: Math.ceil(threads.totalItems / perPage),
    }

    return forumResponseSchema.parse(response)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

export async function getSubforums(pb: PocketBase, parentId: string): Promise<Forum[]> {
  try {
    const records = await pb.collection('forums').getFullList<Forum>(200, {
      sort: '-created',
      filter: `parent_forum="${parentId}"`,
      expand: 'genre',
    })
    return records.map((record) => forumSchema.parse(record))
  }
  catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

export async function getTopLevelForums(pb: PocketBase): Promise<Forum[]> {
  try {
    const records = await pb.collection('forums').getFullList<Forum>(200, {
      sort: '-created',
      filter: 'parent_forum = ""',
      expand: 'genre',
    })
    return records.map((record) => forumSchema.parse(record))
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
      )
    }
    throw error
  }
}

export async function getForumById(pb: PocketBase, id: string) {
  try {
    const forum = await pb.collection('forums').getOne(id, {
      expand: 'genre,subforums,owner'
    })
    return forumSchema.parse(forum)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

export async function getForumBySlug(pb: PocketBase, slug: string) {
  try {
    const forum = await pb
      .collection('forums')
      .getFirstListItem<Forum>(`slug="${slug}"`, {
        expand: 'genre,subforums',
      })
    return forumSchema.parse(forum)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
      )
    }
    throw error
  }
}