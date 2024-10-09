<script lang="ts">
  export let forum;
</script>

<div class="bg-base-200 p-6 rounded-box shadow-lg mb-6">
  <h1 class="text-3xl font-bold mb-2">{forum.name}</h1>
  <p class="text-base-content/70">{forum.description}</p>
  <div class="mt-4 flex items-center space-x-4">
    <span class="badge badge-primary">{forum.genre}</span>
    <span class="text-sm">Threads: {forum.threadCount}</span>
    <span class="text-sm">Posts: {forum.postCount}</span>
  </div>
</div>