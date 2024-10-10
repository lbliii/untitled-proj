import { createForumSchema } from '$lib/schemas/forum'
import { fail } from '@sveltejs/kit'

export async function load({ params, locals: { pb } }) {
  const forum = await pb.collection('forums').getOne(params.identifier);
  const parsedForum = createForumSchema.safeParse(forum);
  
  return { 
    forum,
    isValid: parsedForum.success,
    errors: parsedForum.success ? {} : parsedForum.error.flatten().fieldErrors
  };
}

export const actions = {
  default: async ({ request, params, locals }) => {
    console.log('Action triggered');
    const pb = locals.pb;
    
    const formData = Object.fromEntries(await request.formData());
    const result = createForumSchema.safeParse(formData);

    if (!result.success) {
      return fail(400, {
        data: formData,
        errors: result.error.flatten().fieldErrors
      });
    }

    try {
      await pb.collection('forums').update(params.identifier, result.data);
      return { success: true };
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Failed to update forum' });
    }
  }
};
