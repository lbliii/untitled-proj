import { json } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'
import { forumSchema } from '$lib/schemas/forumSchemas'

export async function GET({ params }) {
  try {
    const { id } = params
    const record = await pb.collection('forums').getOne(id)
    return json(record)
  } catch (error) {
    console.error('Error fetching forum:', error)
    return json({ error: 'Forum not found' }, { status: 404 })
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params
    const body = await request.json()
    const validatedForum = forumSchema.parse(body)
    
    const record = await pb.collection('forums').update(id, validatedForum)
    
    return json(record)
  } catch (error) {
    console.error('Error updating forum:', error)
    return json({ error: 'Failed to update forum' }, { status: 400 })
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params
    await pb.collection('forums').delete(id)
    
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting forum:', error)
    return json({ error: 'Failed to delete forum' }, { status: 400 })
  }
}
