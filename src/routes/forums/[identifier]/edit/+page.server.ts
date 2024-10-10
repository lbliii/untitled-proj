import { fail } from '@sveltejs/kit'
import { getForumById, updateForum } from '$lib/services/forum'
import { forumSchema, updateForumSchema } from '$lib/schemas/forum'
import type { Actions } from './$types'

export async function load({ params, locals: { pb } }) {
  try {
    const forum = await getForumById(pb, params.identifier)
    const parsedForum = forumSchema.safeParse(forum)

    return {
      forum,
      isValid: parsedForum.success,
      errors: parsedForum.success
        ? {}
        : parsedForum.error.flatten().fieldErrors,
    }
  } catch (error) {
    console.error(error)
    // Handle error appropriately, e.g., redirect or return an error page
    return fail(500, { message: 'Failed to load forum' })
  }
}

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    console.log('Action triggered')
    
    // Extract `pb` from `locals`
    const { pb } = locals

    const formData = Object.fromEntries(await request.formData())
    const result = updateForumSchema.safeParse(formData)

    if (!result.success) {
      return fail(400, {
        data: formData,
        errors: result.error.flatten().fieldErrors,
      })
    }

    try {
      await updateForum(pb, params.identifier, result.data)
      return { success: true }
    } catch (err) {
      console.error(err)
      return fail(500, { message: 'Failed to update forum' })
    }
  },
}