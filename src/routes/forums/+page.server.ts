import type { PageServerLoad } from './$types';
import { forumsResponseSchema } from '$lib/schemas/forumSchemas';

export const load: PageServerLoad = async (event) => {
  try {
    // Fetch data from the internal API
    const response = await event.fetch('/api/forums');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch forums.');
    }

    const data = await response.json();

    // Validate the fetched data using the Zod schema
    const parsed = forumsResponseSchema.safeParse(data);

    if (!parsed.success) {
      console.error('Zod Validation Error:', parsed.error);
      throw new Error('Invalid forum data received.');
    }

    return {
      forums: parsed.data.forums
    };
  } catch (error) {
    console.error('Load Function Error:', error);
    // Optionally, you can return an empty array or handle the error as needed
    return {
      forums: [],
      error: error.message
    };
  }
};