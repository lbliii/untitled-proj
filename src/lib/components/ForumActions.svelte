<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Forum } from '$lib/schemas/forum';
  import type { User } from '$lib/schemas/user'; 

  export let user: User | null;
  export let forum: Forum;
  $: isAdmin = user?.role === 'admin';
  $: isOwner = user?.id === forum.owner;

  async function deleteForum() {
    if (confirm('Are you sure you want to delete this forum? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/forums/${forum.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete forum');
        }
        
        goto('/forums');
      } catch (error) {
        console.error('Error deleting forum:', error);
        alert('Failed to delete forum. Please try again.');
      }
    }
  }
</script>

{#if isAdmin || isOwner}
  <div class="dropdown dropdown-end">
    <button class="btn btn-ghost btn-circle" aria-label="Menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>
    <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><a href="/forums/{forum.id}/edit" class="py-2">Edit Forum</a></li>
      <li><button on:click={deleteForum} class="text-error py-2 w-full text-left">Delete Forum</button></li>
    </ul>
  </div>
{/if}