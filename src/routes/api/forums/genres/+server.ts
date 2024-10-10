import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pb } from '$lib/pocketbase';
import { forumSchema } from '$lib/schemas/forum';
import { genreSchema } from '$lib/schemas/genreSchemas';

export const GET: RequestHandler = async () => {
    try {
        const genres = await pb.collection('genres').getFullList({
            sort: 'name',
        });

        const forumsPromises = genres.map(async (genre) => {
            const forums = await pb.collection('forums').getList(1, 50, {
                filter: `genre = "${genre.id}"`,
                sort: '-created',
            });

            return {
                ...genreSchema.parse(genre),
                forumCount: forums.totalItems,
                forums: forums.items.map(forum => forumSchema.parse(forum)),
            };
        });

        const genresWithForums = await Promise.all(forumsPromises);

        return json({ genres: genresWithForums });
    } catch (error) {
        console.error('Error fetching genres with forums:', error);
        return json({ error: 'Failed to fetch genres with forums' }, { status: 500 });
    }
};
