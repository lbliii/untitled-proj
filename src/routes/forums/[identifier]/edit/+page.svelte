<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
  export let form;

  $: ({ forum } = data);
</script>

<form method="POST" use:enhance>
  <input name="name" value={forum.name} />
  <textarea name="description">{forum.description}</textarea>
  <!-- Add other form fields based on your schema -->
  <button type="submit">Update Forum</button>
</form>

{#if form?.errors}
  <div class="errors">
    {#each Object.entries(form.errors) as [field, errors]}
      <p>{field}: {errors.join(', ')}</p>
    {/each}
  </div>
{/if}
