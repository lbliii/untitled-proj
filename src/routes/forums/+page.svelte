<script lang="ts">
  import GenreSection from '$lib/components/GenreSection.svelte';
  import type { Forum } from '$lib/schemas/forumSchemas';
  export let data: { forums: Forum[]; error?: string };

  // Function to group forums by genre
  function groupForumsByGenre(forums: Forum[]): { [genre: string]: Forum[] } {
    return forums.reduce((acc, forum) => {
      const genre = forum.genre || 'Uncategorized';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(forum);
      return acc;
    }, {} as { [genre: string]: Forum[] });
  }

  // Reactive statement to update forumsByGenre whenever data.forums changes
  $: forumsByGenre = data.forums ? groupForumsByGenre(data.forums) : {};

  // Generate a sorted array of genres
  $: sortedGenres = Object.keys(forumsByGenre).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
</script>

{#if data.error}
  <div class="p-4 bg-red-100 text-red-700 rounded">
    <p>Error: {data.error}</p>
  </div>
{:else if Object.keys(forumsByGenre).length > 0}
  {#each sortedGenres as genre}
    <GenreSection genre={genre} forums={forumsByGenre[genre]} />
  {/each}
{:else}
  <p class="text-center text-gray-500">Loading forums...</p>
{/if}