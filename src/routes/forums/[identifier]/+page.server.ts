import { error } from '@sveltejs/kit'
import { getForumById, getForumBySlug } from '$lib/services/forum'
import { forumSchema, forumResponseSchema } from '$lib/schemas/forum'
import { threadSchema } from '$lib/schemas/thread'

export async function load({ params, url, locals: { pb } }) {
  const { identifier } = params
  const page = +(url.searchParams.get('page') ?? '1')
  const perPage = 20

  console.log(`Navigating to forum with identifier: ${identifier} on page: ${page}`)

  let forumData = await getForumById(pb, identifier)
  console.log(`Fetched forum by ID: ${forumData ? forumData.id : 'Not Found'}`)

  // If not found by ID, try to fetch by slug
  if (!forumData) {
    forumData = await getForumBySlug(pb, identifier)
    console.log(`Fetched forum by Slug: ${forumData ? forumData.id : 'Not Found'}`)
  }

  // If we still don't have forum data, throw a 404
  if (!forumData) {
    console.error(`Forum with identifier "${identifier}" not found.`)
    throw error(404, 'Forum not found')
  }

  // Use safeParse instead of parse
  const parsedForum = forumSchema.safeParse({
    id: forumData.id,
    name: forumData.name,
    description: forumData.description,
    genre: forumData.expand?.genre?.name || null,
    createdAt: forumData.createdAt,
    slug: forumData.slug || '',
    owner: forumData.owner || null,
    parent_forum: forumData.parent_forum || null
  })

  if (!parsedForum.success) {
    console.error('Validation error:', parsedForum.error)
    throw error(500, 'Failed to process forum data')
  }

  const validatedForum = parsedForum.data

  try {
    // Fetch subforums (children of the current forum)
    const subforumsResponse = await pb.collection('forums').getList(1, 50, {
      filter: `parent_forum="${forumData.id}"`,
      sort: 'name'
    })
    console.log(`Fetched ${subforumsResponse.items.length} subforums`)

    // Validate subforums
    const validatedSubforums = subforumsResponse.items.map(subforum => {
      const result = forumSchema.safeParse(subforum)
      if (!result.success) {
        console.error('Subforum validation error:', result.error)
        throw error(500, 'Failed to process subforum data')
      }
      return result.data
    })

    // Fetch threads for the current forum
    const threadsResponse = await pb.collection('threads').getList(page, perPage, {
      filter: `forum="${forumData.id}"`,
      sort: '-created',
      expand: 'author'
    })
    console.log(`Fetched ${threadsResponse.items.length} threads`)

    // Validate threads
    const validatedThreads = threadsResponse.items.map(thread => {
      const result = threadSchema.safeParse(thread)
      if (!result.success) {
        console.error('Thread validation error:', result.error)
        throw error(500, 'Failed to process thread data')
      }
      return result.data
    })

    // Validate the entire response without including the user to prevent overriding layout data
    const validatedResponse = forumResponseSchema.safeParse({
      forum: validatedForum,
      subforums: validatedSubforums,
      threads: validatedThreads,
      currentPage: page,
      totalPages: Math.ceil(threadsResponse.totalItems / perPage),
    })

    if (!validatedResponse.success) {
      console.error('Response validation error:', validatedResponse.error)
      throw error(500, 'Failed to process forum response data')
    }

    console.log('Validated response successfully')

    return validatedResponse.data
  } catch (err) {
    console.error('Error processing forum data:', err)
    throw error(500, 'Failed to process forum data')
  }
}
