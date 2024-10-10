<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores/user'
  import SpatzMarketing from '$lib/components/SpatzMarketing.svelte'
  import SpatzLanding from '$lib/components/SpatzLanding.svelte'
  import ForumTile from '$lib/components/ForumTile.svelte'

</script>

<!-- Home page. Dynamically choose which content 
  to show based on whether the user is logged in or not. -->
<div>
  {#if !$currentUser}
    <!-- If user is NOT logged in, show the landing content -->
    <SpatzLanding />
  {:else}
    <!-- If user is logged in, show the marketing content -->
    <!-- <SpatzMarketing />  -->
    <h2>Forums</h2>

  {/if}
</div>

<style>
  .forum-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
