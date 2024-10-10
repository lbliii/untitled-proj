import { error } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'
import { forumResponseSchema, forumSchema } from '$lib/schemas/forum'
import { threadSchema } from '$lib/schemas/thread'

export async function load({ params, url }) {
  const { identifier } = params
  const page = +(url.searchParams.get('page') ?? '1')
  const perPage = 20
  let forumData

  // Try to fetch by ID
  forumData = await pb.collection('forums').getOne(identifier, {
    expand: 'genre,subforums,owner',
  }).catch(() => null)

  // If not found by ID, try to fetch by slug
  if (!forumData) {
    forumData = await pb.collection('forums').getFirstListItem(`slug="${identifier}"`, {
      expand: 'genre,subforums',
    }).catch(() => null)
  }

  // If still not found, try name-based search
  if (!forumData) {
    const results = await pb.collection('forums').getList(1, 1, {
      filter: `name~"${identifier.replace(/-/g, ' ')}"`,
      expand: 'genre,subforums',
    }).catch(() => ({ items: [] }))
    
    forumData = results.items[0] || null
  }

  // If we still don't have forum data, throw a 404
  if (!forumData) {
    throw error(404, 'Forum not found')
  }

  console.log('Raw forum data:', JSON.stringify(forumData, null, 2))

  try {
    // Validate the basic forum data
    const validatedForum = forumSchema.parse({
      id: forumData.id,
      name: forumData.name,
      description: forumData.description,
      genre: forumData.expand?.genre?.name || null,
      createdAt: forumData.created,
      slug: forumData.slug || '',
      owner: forumData.owner || null,
      parent_forum: forumData.parent_forum || null
    })

    // Fetch subforums (children of the current forum)
    const subforumsResponse = await pb.collection('forums').getList(1, 50, {
      filter: `parent_forum="${forumData.id}"`,
      sort: 'name'
    })

    // Validate subforums
    const validatedSubforums = subforumsResponse.items.map(subforum => forumSchema.parse(subforum))

    // Fetch threads for the current forum
    const threadsResponse = await pb.collection('threads').getList(page, perPage, {
      filter: `forum="${forumData.id}"`,
      sort: '-created',
      expand: 'author'
    })

    // Validate threads
    const validatedThreads = threadsResponse.items.map(thread => threadSchema.parse(thread))

    // Validate the entire response without including the user to prevent overriding layout data
    const validatedResponse = forumResponseSchema.parse({
      forum: validatedForum,
      subforums: validatedSubforums,
      threads: validatedThreads,
      currentPage: page,
      totalPages: Math.ceil(threadsResponse.totalItems / perPage),
      // Removed the user field to avoid overriding the layout's user data
      // You can access the user from locals in your frontend components
    })

    console.log('Validated response:', JSON.stringify(validatedResponse, null, 2))

    return validatedResponse
  } catch (err) {
    console.error('Error validating forum data:', err)
    throw error(500, 'Failed to process forum data')
  }
}
