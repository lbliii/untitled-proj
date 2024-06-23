// +page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { createGuestBookPostSchema } from '$lib/schemas';

interface CustomError {
    status: number;
    message: string;
}

// LOAD FUNCTION
export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth/login');
    }
    // GET POSTS
    const posts = await locals.pb.collection('posts').getFullList({
        sort: '-created',
    });
    // GET USERS
    const users = await locals.pb.collection('users').getFullList({
        fields: 'id,username',
    });
    // ADD AUTHORS USERNAME TO POST OBJECT
    const stuff = posts.map(post => ({
        id: post.id,
        author: post.author,
        content: post.content,
        collectionId: post.collectionId,
        collectionName: post.collectionName,
        created: post.created,
        updated: post.updated,
        username: users.find(user => user.id === post.author)?.username
    }));

    return { posts: stuff };
}

// FORM ACTIONS
export const actions: Actions = {
    createPost: async ({ request, locals }) => {
        const { formData, errors } = await validateData(await request.formData(), createGuestBookPostSchema);
        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            });
        }
        try {
            await locals.pb.collection('posts').create(formData);
        } catch (err) {
            const customError = err as CustomError;
            console.log('Error: ', 'error creating post: ' + customError.message);
            throw error(customError.status, customError.message);
        }
        return { success: true };
    }
};
