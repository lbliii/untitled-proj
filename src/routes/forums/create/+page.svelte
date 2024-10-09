<script lang="ts">
  import { createForumSchema } from '$lib/archive-schemas';
  import { superForm } from 'sveltekit-superforms/client';

  const { form, errors, enhance } = superForm(createForumSchema);
</script>

<h1>Create New Forum</h1>

<form method="POST" use:enhance>
  <div>
    <label for="name">Name</label>
    <input id="name" name="name" bind:value={$form.name} />
    {#if $errors.name}<span class="error">{$errors.name}</span>{/if}
  </div>

  <div>
    <label for="description">Description</label>
    <textarea id="description" name="description" bind:value={$form.description}></textarea>
    {#if $errors.description}<span class="error">{$errors.description}</span>{/if}
  </div>

  <div>
    <label for="genre">Genre</label>
    <select id="genre" name="genre" bind:value={$form.genre}>
      <option value="">Select a genre</option>
      <!-- Add genre options here -->
    </select>
    {#if $errors.genre}<span class="error">{$errors.genre}</span>{/if}
  </div>

  <button type="submit">Create Forum</button>
</form>
