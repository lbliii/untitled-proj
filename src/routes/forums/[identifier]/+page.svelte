<script lang="ts">
  import ForumHeader from '$lib/components/ForumHeader.svelte'
  import ThreadList from '$lib/components/ThreadList.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import CreateThreadButton from '$lib/components/CreateThreadButton.svelte';

  export let data;
  const { forum, threads, currentPage, totalPages } = data;
</script>

<div class="container mx-auto p-4">
  <ForumHeader {forum} />
  
  <div class="flex justify-between items-center my-4">
    <h2 class="text-2xl font-bold">Threads</h2>
    <CreateThreadButton {forum} />
  </div>

    <ThreadList {threads} />

  
  <div class="mt-4">
    <Pagination {currentPage} {totalPages} />
  </div>
</div>
