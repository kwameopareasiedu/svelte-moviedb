<script>
  import { ActionStatus, hashRoute } from "../utils";
  import { ROUTE_LANDING } from "../config";
  import Navbar from "./Navbar.svelte";
  import movieStore, {
    moviesStatus,
    movies,
    moviesError,
    moviesPage
  } from "../store/movieStore";
  import { onMount } from "svelte";
  import MovieCard from "./MovieCard.svelte";

  onMount(movieStore.fetchMovies);
</script>

<Navbar />

<div id="movies-page" class="with-navbar h-100">
  <div class="container py-5">
    <div class="breadcrumbs mb-4">
      <a href={hashRoute(ROUTE_LANDING)}>
        <i>Home</i>
      </a>
    </div>

    {#if $moviesStatus === ActionStatus.pending}
      <div class="text-center mb-4">
        <span class="spinner-grow spinner-grow-sm me-2" />
        <small>Please wait</small>
      </div>
    {/if}

    {#if $moviesError && $moviesStatus !== ActionStatus.pending}
      <div class="alert alert-danger mb-4 py-2">
        <span class="bi-exclamation-triangle me-2" />
        <small>{$moviesError}</small>
      </div>
    {/if}

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">
        <strong>Discover</strong> <span class="fw-lighter">New Movies</span>
      </h1>

      <button
        class="btn btn-primary py-1"
        on:click={() => movieStore.fetchMovies($moviesPage)}>
        <span class="bi-arrow-clockwise" />
        <small class="text-white">Refresh</small>
      </button>
    </div>

    {#if $movies.length > 0}
      <div class="row">
        {#each $movies as movie, i}
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <MovieCard {movie} />
          </div>
        {/each}
      </div>
    {:else}
      <p class="mb-0">No movies to display</p>
    {/if}
  </div>
</div>

<style lang="scss">
  #movies-page {
  }
</style>
