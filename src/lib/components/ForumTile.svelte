<script lang="ts">
    export let forum: {
        id: string;
        name: string;
        description: string;
        genre: string | null;
        createdAt: string;
        slug: string;
    };
</script>

<div class="forum-tile">
    <a href="/forums/{forum.name}">
    <h3>{forum.name}</h3>
    <p>{forum.description}</p>
    {#if forum.genre}
        <span class="genre">{forum.genre}</span>
    {/if}
    </a>
</div>


<style>
    .forum-tile {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem;
    }
    .genre {
        font-size: 0.8rem;
        color: #666;
    }
</style>