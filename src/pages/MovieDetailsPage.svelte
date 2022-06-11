<script lang="ts">
  import movieStore, {
    activeMovie,
    activeMovieStatus,
    activeMovieError
  } from "../store/movieStore";
  import { hashRoute, ActionStatus } from "../utils";
  import { ROUTE_LANDING, ROUTE_MOVIES } from "../config";
  import Navbar from "./Navbar.svelte";
  import { onMount, tick } from "svelte";
  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";

  dayjs.extend(advancedFormat);

  export let params: any = {};

  onMount(async () => {
    await tick();

    movieStore.fetchMovie(params.id);
  });

  function formatRuntime(runtime: number): string {
    const hours = parseInt((runtime / 60).toString());
    const minutes = runtime % 60;
    const hourSuffix = hours === 1 ? "hour" : "hours";
    const minuteSuffix = minutes === 1 ? "minute" : "minutes";

    return `${hours} ${hourSuffix} ${minutes} ${minuteSuffix}`;
  }
</script>

<Navbar />

<div id="movie-details-page" class="with-navbar h-100">
  {#if $activeMovieStatus === ActionStatus.pending}
    <div class="h-100 grid-center">
      <span class="spinner-grow spinner-grow-sm me-2" />
    </div>
  {:else if $activeMovie}
    <div id="poster-container">
      <img src={$activeMovie.posterUrl} alt="Poster Image" />
    </div>

    <div id="scrim" />

    <div class="container py-4">
      <div class="breadcrumbs mb-0">
        <a href={hashRoute(ROUTE_LANDING)}>
          <i>Home</i>
        </a>
        /
        <a href={hashRoute(ROUTE_MOVIES)}>
          <i>Movies</i>
        </a>
      </div>

      <h1 class="fw-lighter lh-1 mb-0">{$activeMovie.title}</h1>

      <div class="d-flex justify-content-between mb-4">
        <p class="opacity-50 mb-0">
          <small><i>{$activeMovie.tagline}</i></small>
        </p>

        <p class="mb-0">
          <span class="bi-translate" />
          <small>{$activeMovie.languages.join(", ")}</small>
        </p>
      </div>

      <p>{$activeMovie.description}</p>

      <footer class="d-flex justify-content-between">
        <p class="mb-0">
          <span class="bi-star-half small" />
          <small>
            <strong>{$activeMovie.rating}</strong>
            <span class="opacity-50">/ 10</span>
          </small>
        </p>

        <p class="mb-0">
          <small>
            <span class="bi-calendar3 small" />
            <strong>
              {dayjs($activeMovie.releaseDate).format("ddd Do MMMM, YYYY")},
            </strong>
          </small>

          <small>
            <span class="bi-hourglass-split small" />
            <strong>{formatRuntime($activeMovie.runtime)}</strong>
          </small>
        </p>

        <p class="mb-0">
          <small
            ><span class="opacity-50">from</span>
            {$activeMovie.votes} votes</small>
        </p>
      </footer>
    </div>
  {/if}
</div>

<style lang="scss">
  #movie-details-page {
    * {
      color: white;
    }

    #poster-container,
    #scrim,
    .container {
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      bottom: 0;
    }

    #poster-container {
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 30%;
      }
    }

    #scrim {
      top: -100px;
      background: linear-gradient(0deg, black, transparent);
    }

    .container {
      top: unset;
      max-width: 720px;

      h1 {
        font-size: 4rem;
      }
    }
  }
</style>
