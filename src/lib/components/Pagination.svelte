<script lang="ts">
  export let currentPage: number;
  export let totalPages: number;
</script>

<div class="btn-group">
  {#each Array(totalPages) as _, i}
    <a
      href="?page={i + 1}"
      class="btn btn-sm {currentPage === i + 1 ? 'btn-active' : ''}"
    >
      {i + 1}
    </a>
  {/each}
</div>