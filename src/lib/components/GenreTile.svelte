<script lang="ts">
import { genresSchema, type Genre } from '$lib/schemas';

export let genres: Genre[];
$: validatedGenres = GenresSchema.parse(genres);
</script>

{#each validatedGenres as genre}
    <!-- Render genre tile -->
{/each}