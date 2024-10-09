import { json } from '@sveltejs/kit'
import { pb } from '$lib/pocketbase'
import { forumSchema } from '$lib/schemas/forumSchemas'

export async function GET() {
  try {
    const forums = await pb.collection('forums').getFullList({
      sort: '-created',
      expand: 'owner,genre,subforums',
    });

    const validatedForums = forums.map(forum => forumSchema.parse({
      ...forum,
      owner: forum.expand?.owner?.id || forum.owner || null,
      genre: forum.expand?.genre?.name || null,
      // ... other fields ...
    }));

    return json({ forums: validatedForums });
  } catch (error) {
    console.error('Error fetching forums:', error);
    return json({ error: 'Failed to fetch forums' }, { status: 500 });
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
