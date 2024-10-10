<script lang="ts">
  import { forumSchema } from '$lib/schemas/forum';
  import type { TypeOf } from 'zod';
  import ForumActions from './ForumActions.svelte';
  import type { User } from '$lib/schemas/user';

  export let forum: TypeOf<typeof forumSchema>;
  export let user: User | null;
</script>

<div class="bg-base-200 p-6 rounded-box shadow-lg mb-6">
  <div class="flex justify-between items-start">
    <div>
      <h1 class="text-3xl font-bold mb-2">{forum.name}</h1>
      <p class="text-base-content text-opacity-70">{forum.description}</p>
      <div class="mt-4 flex items-center space-x-4">
        <span class="badge badge-primary">{forum.genre}</span>
        <span class="text-sm">Threads: {forum.threadCount}</span>
        <span class="text-sm">Posts: {forum.postCount}</span>
      </div>
    </div>
    <ForumActions {forum} {user} />
  </div>
</div>