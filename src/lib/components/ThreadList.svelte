<script lang="ts">
  export let threads: any[] | undefined = undefined;
</script>

{#if threads === undefined}
  <div class="alert alert-info">
    <span>Loading threads...</span>
  </div>
{:else if threads.length === 0}
  <div class="alert alert-warning">
    <span>No threads found. Be the first to start a discussion!</span>
  </div>
{:else}
  <div class="space-y-4">
    {#each threads as thread}
      <div class="bg-base-100 p-4 rounded-box shadow hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold">
              <a href="/threads/{thread.id}" class="link link-hover">{thread.title}</a>
            </h3>
            <p class="text-sm text-base-content/60">
              Started by {thread.author} on {new Date(thread.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div class="text-right">
            <span class="badge badge-ghost">{thread.replyCount} replies</span>
            <p class="text-xs mt-1">Last post: {new Date(thread.lastPostAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}