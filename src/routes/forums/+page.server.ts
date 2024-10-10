import type { PageServerLoad } from './$types'
import { getTopLevelForums } from '$lib/services/forum'
import type { Forum } from '$lib/schemas/forum'

export const load: PageServerLoad = async ({ locals }) => {
  try {
    // Fetch forums using the service layer
    const forums: Forum[] = await getTopLevelForums(locals.pb)

    // Organize forums by genre name
    const forumsByGenre: { [genre: string]: Forum[] } = {}

    forums.forEach(forum => {
      const genreName = forum.expand?.genre?.name || 'Uncategorized'
      if (!forumsByGenre[genreName]) {
        forumsByGenre[genreName] = []
      }
      forumsByGenre[genreName].push(forum)
    })

    // Extract and sort genre names
    const sortedGenres = Object.keys(forumsByGenre).sort()

    return {
      forumsByGenre,
      sortedGenres,
      error: null,
    }
  } catch (error) {
    return {
      forumsByGenre: {},
      sortedGenres: [],
      error: (error as Error).message || 'Failed to load forums',
    }
  }
}