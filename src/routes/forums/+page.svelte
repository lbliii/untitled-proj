<script lang="ts">
  import { onMount } from 'svelte';
  import { forumsResponseSchema } from '$lib/archive-schemas';
  import type { z } from 'zod';
  import ForumList from '$lib/components/ForumList.svelte';

  type ForumsResponse = z.infer<typeof forumsResponseSchema>;
  type Forum = ForumsResponse['forums'][number];

  let forums: Forum[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/forums');
      if (!response.ok) throw new Error('Failed to fetch forums');
      const data = await response.json();
      const validatedData = forumsResponseSchema.parse(data);
      forums = validatedData.forums;
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Forums | Your App Name</title>
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Forums</h1>

  {#if loading}
    <p class="text-center">Loading forums...</p>
  {:else if error}
    <p class="text-error text-center">{error}</p>
  {:else}
    <ForumList {forums} />
  {/if}
</div>