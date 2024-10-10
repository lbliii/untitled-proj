import { json } from '@sveltejs/kit'
import { updateForum, deleteForum, getForumById } from '$lib/services/forum'

export async function GET({ params }) {
  try {
    const { id } = params
    const forum = await getForumById(id)
    return json(forum)
  } catch (error) {
    console.error('Error fetching forum:', error)
    return json({ error: error.message || 'Forum not found' }, { status: 404 })
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params
    const body = await request.json()
    const updatedForum = await updateForum(id, body)
    return json(updatedForum)
  } catch (error) {
    console.error('Error updating forum:', error)
    return json({ error: error.message || 'Failed to update forum' }, { status: 400 })
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params
    await deleteForum(id)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting forum:', error)
    return json({ error: error.message || 'Failed to delete forum' }, { status: 400 })
  }
}
