import { json } from '@sveltejs/kit'
import { createForum, getTopLevelForums } from '$lib/services/forum'

export async function GET() {
  try {
    const forums = await getTopLevelForums()
    return json({ forums })
  } catch (error) {
    console.error('Error fetching forums:', error)
    return json({ error: 'Failed to fetch forums' }, { status: 500 })
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json()
    const newForum = await createForum(body)
    return json(newForum, { status: 201 })
  } catch (error) {
    console.error('Error creating forum:', error)
    return json({ error: error.message || 'Failed to create forum' }, { status: 400 })
  }
}
