<script>
  import { hashRoute } from "../utils";
  import { ROUTE_LANDING } from "../config";
  import Navbar from "./Navbar.svelte";
  import MovieList from "./MovieList.svelte";
  import movieStore from "../store/movieStore";
  import { onMount, tick } from "svelte";

  onMount(async () => {
    await tick();

    movieStore.fetchMovies();
  });
</script>

<Navbar />

<div id="movies-page" class="with-navbar h-100">
  <div class="container py-5">
    <div class="breadcrumbs mb-4">
      <a href={hashRoute(ROUTE_LANDING)}>
        <i>Home</i>
      </a>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">
        <strong>Discover</strong> <span class="fw-lighter">New Movies</span>
      </h1>

      <button
        class="btn btn-primary py-1"
        on:click={() => movieStore.fetchMovies(1)}>
        <span class="bi-arrow-clockwise" />
        <small class="text-white">Refresh</small>
      </button>
    </div>

    <MovieList />
  </div>
</div>
