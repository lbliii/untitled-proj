<script lang="ts">
  import GenreSection from '$lib/components/GenreSection.svelte';
  import type { Forum } from '$lib/schemas/forum';
  export let data: {
    forumsByGenre: { [genre: string]: Forum[] };
    sortedGenres: string[];
    error?: string;
  };
</script>

{#if data.error}
  <div class="p-4 bg-red-100 text-red-700 rounded">
    <p>Error: {data.error}</p>
  </div>
{:else if data.sortedGenres.length > 0}
  {#each data.sortedGenres as genre}
    <GenreSection genre={genre} forums={data.forumsByGenre[genre]} />
  {/each}
{:else}
  <p class="text-center text-gray-500">Loading forums...</p>
{/if}