import { error } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'
import { forumResponseSchema, forumSchema } from '$lib/schemas/forumSchemas'

export async function load({ params }) {
  const { identifier } = params
  let forumData

  // Try to fetch by ID
  forumData = await pb.collection('forums').getOne(identifier, {
    expand: 'genre,subforums',
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
    // Validate the basic forum data first
    const validatedForum = forumSchema.parse({
      id: forumData.id,
      name: forumData.name,
      description: forumData.description,
      genre: forumData.expand?.genre?.name || null,
      createdAt: forumData.created,
      slug: forumData.slug,
    })

    console.log('Validated forum data:', JSON.stringify(validatedForum, null, 2))

    // Now validate the entire response, including subforums
    const validatedResponse = forumResponseSchema.parse({
      forum: {
        ...validatedForum,
        subforums: forumData.expand?.subforums || [],
      },
    })

    console.log('Validated response:', JSON.stringify(validatedResponse, null, 2))

    return validatedResponse
  } catch (err) {
    console.error('Error validating forum data:', err)
    throw error(500, 'Failed to process forum data')
  }
}
