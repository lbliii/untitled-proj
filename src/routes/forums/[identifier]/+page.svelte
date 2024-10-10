<script lang="ts">
  import ForumHeader from '$lib/components/ForumHeader.svelte'
  import ThreadList from '$lib/components/ThreadList.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import CreateThreadButton from '$lib/components/CreateThreadButton.svelte';
  import ForumList from '$lib/components/ForumList.svelte';

  export let data;
  const { forum, threads, subforums, currentPage, totalPages, user } = data;
</script>

<div class="container mx-auto p-4">
  <ForumHeader {forum} {user} />
  
  {#if subforums && subforums.length > 0}
    <div class="my-6">
      <h2 class="text-2xl font-bold mb-4">Subforums</h2>
      <ForumList forums={subforums} />
    </div>
  {/if}

  <div class="flex justify-between items-center my-6">
    <h2 class="text-2xl font-bold">Threads</h2>
    <CreateThreadButton {forum} />
  </div>

  <ThreadList {threads} />
  
  <div class="mt-6">
    <Pagination {currentPage} {totalPages} />
  </div>
</div>
