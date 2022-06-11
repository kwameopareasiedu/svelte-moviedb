<script lang="ts">
  import "./App.scss";
  import LandingPage from "./LandingPage.svelte";
  import _404 from "./404.svelte";
  import Router from "svelte-spa-router";
  import { ROUTE_LANDING, ROUTE_MOVIES, ROUTE_MOVIE } from "../config";
  import MoviesPage from "./MoviesPage.svelte";
  import MovieDetailsPage from "./MovieDetailsPage.svelte";
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap"
    rel="stylesheet" />
</svelte:head>

<Router
  routes={{
    [ROUTE_LANDING]: LandingPage,
    [ROUTE_MOVIES]: MoviesPage,
    [ROUTE_MOVIE]: MovieDetailsPage,
    "*": _404
  }} />
