<script lang="ts">
  export let data;
  const { forum, user } = data;

  $: canDelete = user && (user.id === forum.user || user.isAdmin);
</script>

<h1>{forum.name}</h1>
<p>{forum.description}</p>
<a href="/forums/{forum.id}/edit">Edit Forum</a>
{#if forum.genre}
  <p>Genre: {forum.genre}</p>
{/if}
<p>Created: {new Date(forum.createdAt).toLocaleDateString()}</p>

<h2>Subforums</h2>
{#if forum.subforums.length > 0}
  <ul>
    {#each forum.subforums as subforum}
      <li>
        <a href="/forums/{subforum.slug}">{subforum.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No subforums found.</p>
{/if}

{#if canDelete}
<form method="POST" action="?/delete">
  <button type="submit">Delete Forum</button>
  </form>
{/if}
