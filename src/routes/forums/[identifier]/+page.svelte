<script lang="ts">
  import { onDestroy } from 'svelte';
  import ForumHeader from '$lib/components/ForumHeader.svelte';
  import ThreadList from '$lib/components/ThreadList.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import CreateThreadButton from '$lib/components/CreateThreadButton.svelte';
  import ForumList from '$lib/components/ForumList.svelte';

  export let data;
  let { forum, threads, subforums, currentPage, totalPages, user } = data;

  // Reactive statement to handle data changes
  $: {
    forum = data.forum;
    threads = data.threads;
    subforums = data.subforums;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    user = data.user;
  }

  // Optional: Watch for specific changes
  $: console.log('Forum data updated:', forum?.id);
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