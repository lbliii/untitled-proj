import { createForumSchema } from '$lib/schemas/forumSchemas'
import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'

export const load = async () => {
  const form = await superValidate(createForumSchema)
  return { form }
}

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, createForumSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      await pb.collection('forums').create(form.data)
      return redirect(303, '/forums')
    } catch (err) {
      return fail(500, { form, error: 'Failed to create forum' })
    }
  },
}
