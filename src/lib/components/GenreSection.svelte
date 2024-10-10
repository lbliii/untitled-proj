<script lang="ts">
  import type { Forum } from '$lib/schemas/forum';
  import ForumList from './ForumList.svelte';

  export let genre: string;
  export let forums: Forum[];
</script>

<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">{genre}</h2>
  <ForumList {forums} />
</section>