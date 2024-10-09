import { json } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'
import { forumSchema, forumsResponseSchema } from '$lib/schemas/forumSchemas'

export async function GET() {
  try {
    const records = await pb.collection('forums').getFullList({
      sort: '-created',
      expand: 'genre',
    })

    const forums = records.map((forum) => ({
      id: forum.id,
      name: forum.name,
      description: forum.description,
      genre: forum.expand?.genre?.name || null,
      createdAt: forum.created
    }))

    const validatedForums = forumsResponseSchema.parse({ forums })

    return json(validatedForums)
  } catch (error) {
    console.error('Error fetching forums:', error)
    return json({ error: 'Failed to fetch forums' }, { status: 500 })
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json()
    const validatedForum = forumSchema.parse(body)
    
    const record = await pb.collection('forums').create(validatedForum)
    
    return json(record, { status: 201 })
  } catch (error) {
    console.error('Error creating forum:', error)
    return json({ error: 'Failed to create forum' }, { status: 400 })
  }
}
