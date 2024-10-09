<script lang="ts">
  export let data;
  const { forum, user } = data;

  $: owner = user && (user.id === forum.owner || user.role === 'admin_global');
</script>

<h1>{forum.name}</h1>
<p>{forum.description}</p>
{#if forum.genre}
  <p>Genre: {forum.genre}</p>
{/if}
<p>Created: {new Date(forum.createdAt ?? 0).toLocaleDateString()}</p>

<h2>Subforums</h2>
{#if (forum.subforums?.length ?? 0) > 0}
  <ul>
    {#each forum.subforums ?? [] as subforum}
      <li>
        <a href="/forums/{subforum.slug}">{subforum.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No subforums found.</p>
{/if}

{#if owner}
<form method="POST" action="?/delete">
  <button type="submit">Delete Forum</button>
  </form>

<a href="/forums/{forum.id}/edit">Edit Forum</a>
{/if}
