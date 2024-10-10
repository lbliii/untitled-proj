import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';
import { forumsResponseSchema } from '$lib/schemas/forum';
import type { Forum } from '$lib/schemas/forum';
import { sortStrings, sortByName } from '$lib/schemas/utils';

export const load: PageServerLoad = async ({ locals }) => {
  try {
    // Fetch forums sorted alphabetically by name, expand the genre relation
    const forums: Forum[] = await pb.collection('forums').getFullList<Forum>({
      sort: 'name',
      filter: 'parent_forum = ""', // Exclude forums without a parent_forum
      expand: 'genre' // Expand the genre relation to get genre details
    });

    // Validate the fetched forums using Zod schema
    const parsed = forumsResponseSchema.safeParse({ forums });

    if (!parsed.success) {
      throw new Error('Invalid forum data');
    }

    // Group forums by genre name
    const groupedForums: { [genre: string]: Forum[] } = forums.reduce((acc, forum) => {
      const genre = forum.expand?.genre?.name || 'Uncategorized';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(forum);
      return acc;
    }, {} as { [genre: string]: Forum[] });

    // Sort the genres alphabetically (strings)
    const sortedGenres = Object.keys(groupedForums).sort(sortStrings);

    // Sort each forum list within genres alphabetically by name (objects)
    for (const genre of sortedGenres) {
      groupedForums[genre].sort(sortByName);
    }

    return {
      forumsByGenre: groupedForums,
      sortedGenres,
      error: null
    };
  } catch (error) {
    return {
      forumsByGenre: {},
      sortedGenres: [],
      error: (error as Error).message || 'Failed to load forums'
    };
  }
};