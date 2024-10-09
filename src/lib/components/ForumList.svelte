<script lang="ts">
  import type { z } from 'zod';
  import type { forumsResponseSchema } from '$lib/archive-schemas';
  type ForumsResponse = z.infer<typeof forumsResponseSchema>;
  type Forum = ForumsResponse['forums'][number];

  export let forums: Forum[];
</script>

{#if forums.length === 0}
  <p class="text-center">No forums found.</p>
{:else}
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {#each forums as forum (forum.id)}
      <div class="relative aspect-[2/3] group">
        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 class="text-lg font-bold truncate">
            <a href="/forums/{forum.id}" class="hover:underline">{forum.name}</a>
          </h2>
          {#if forum.description}
            <p class="text-sm line-clamp-2">{forum.description}</p>
          {/if}
          <div class="flex flex-wrap gap-2 mt-2">
            {#if forum.genre}
              <span class="text-xs bg-white/20 px-2 py-1 rounded">{forum.genre}</span>
            {/if}
          </div>
        </div>
        <div class="w-full h-full bg-gray-700 rounded-lg overflow-hidden">
          <!-- Replace with actual forum image if available -->
          <div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            {forum.name[0]}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}