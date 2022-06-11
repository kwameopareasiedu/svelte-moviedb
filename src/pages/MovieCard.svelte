<script lang="ts">
  import type Movie from "../models/movie";

  export let movie: Movie;
</script>

<div class="movie-card card rounded-0">
  <div class="poster-container">
    <img src={movie.posterUrl} alt="Movie Poster" />
  </div>

  <div class="card-body">
    <h4>{movie.title}</h4>

    <p class="mb-0">
      <small
        >{movie.description.substring(0, 100)}...
        <a href=""
          ><i class="fw-bold d-inline-block flex-nowrap">Read more</i></a
        ></small>
    </p>
  </div>

  <div class="card-footer d-flex justify-content-between fst-italic">
    <p class="mb-0">
      <span class="bi-star-half small" />
      <small>
        <strong>{movie.rating}</strong>
        <span class="opacity-50">/ 10</span>
      </small>
    </p>

    <p class="mb-0">
      <small><span class="opacity-50">from</span> {movie.votes} votes</small>
    </p>
  </div>
</div>

<style lang="scss">
  .movie-card {
    transition: border-color 0.35s, box-shadow 0.35s;
    overflow: hidden;

    .poster-container {
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }
  }

  .movie-card:hover {
    box-shadow: 2px 2px 12px #aeaeae;
    border-color: transparent;
  }
</style>
