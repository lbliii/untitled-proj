<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  export let form;

  $: ({ forum } = data);

  let isSubmitting = false;

  function handleSubmit() {
    isSubmitting = true;
    return async ({ result, update }) => {
      isSubmitting = false;
      await update();
      if (result.type === 'success') {
        goto(`/forums/${forum.id}`);
      }
    };
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Edit Forum: {forum.name}</h1>

  <form method="POST" use:enhance={handleSubmit} class="space-y-4">
    <div class="form-control">
      <label for="name" class="label">
        <span class="label-text">Forum Name</span>
      </label>
      <input id="name" name="name" value={forum.name} class="input input-bordered" required />
    </div>

    <div class="form-control">
      <label for="description" class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea id="description" name="description" class="textarea textarea-bordered h-24" required>{forum.description}</textarea>
    </div>

    <!-- Add other form fields based on your schema -->

    <div class="form-control mt-6">
      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
        {#if isSubmitting}
          <span class="loading loading-spinner"></span>
        {:else}
          Update Forum
        {/if}
      </button>
    </div>
  </form>

  {#if form?.errors}
    <div class="alert alert-error mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <ul>
        {#each Object.entries(form.errors) as [field, errors]}
          <li><strong>{field}:</strong> {errors.join(', ')}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
