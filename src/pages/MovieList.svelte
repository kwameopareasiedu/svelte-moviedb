<script>
  import { ActionStatus } from "../utils";
  import movieStore, {
    movies,
    moviesError,
    moviesStatus,
    moviesPage
  } from "../store/movieStore";
  import MovieCard from "./MovieCard.svelte";
</script>

<div id="movie-list">
  {#if $moviesError && $moviesStatus !== ActionStatus.pending}
    <div class="alert alert-danger mb-4 py-2">
      <span class="bi-exclamation-triangle me-2" />
      <small>{$moviesError}</small>
    </div>
  {/if}

  {#if $movies.length > 0}
    <div class="row">
      {#each $movies as movie (movie.id)}
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <MovieCard {movie} />
        </div>
      {/each}
    </div>
  {:else}
    <p class="mb-0">No movies to display</p>
  {/if}

  {#if $moviesStatus === ActionStatus.pending}
    <div class="text-center mb-4">
      <span class="spinner-grow spinner-grow-sm me-2" />
      <small>Please wait</small>
    </div>
  {:else}
    <div class="text-center">
      <button
        class="btn btn-primary btn-sm"
        on:click={() => movieStore.fetchMovies($moviesPage + 1)}
        >More Movies</button>
    </div>
  {/if}
</div>
