import { derived, writable } from "svelte/store";
import axios from "axios";
import { API_KEY, POSTER_URL } from "../config";
import { ActionStatus } from "../utils";
import type Movie from "../models/movie";
import type { MovieOverview } from "../models/movie";

interface MovieStoreData {
  items: Array<MovieOverview>;
  itemsStatus: ActionStatus;
  itemsPage: number;
  itemsError?: string;
  active?: Movie;
  activeStatus: ActionStatus;
  activeError?: string;
}

function createMovieStore() {
  const { update, subscribe } = writable<MovieStoreData>({
    items: [],
    itemsPage: 1,
    itemsStatus: ActionStatus.idle,
    activeStatus: ActionStatus.idle
  });

  function fetchMovies(page = 1) {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
      )
      .then((res) => {
        update((s) => {
          delete s.itemsError;
          s.itemsPage = page;
          s.itemsStatus = ActionStatus.success;
          s.items.push(
            ...res.data.results.map((d) => {
              return {
                id: d.id,
                title: d.title,
                description: d.overview,
                posterUrl: POSTER_URL + d.poster_path,
                releaseDate: d.release_date,
                rating: d.vote_average,
                votes: d.vote_count
              } as MovieOverview;
            })
          );

          return { ...s };
        });
      })
      .catch((err) => {
        update((s) => {
          s.itemsStatus = ActionStatus.failed;
          s.itemsError = err.message;
          return { ...s };
        });
      });

    update((s) => {
      s.itemsStatus = ActionStatus.pending;
      s.items = page === 1 ? [] : s.items;
      return { ...s };
    });
  }

  function fetchMovie(id: string) {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        update((s) => {
          const data = res.data;

          delete s.activeError;
          s.activeStatus = ActionStatus.success;
          s.active = {
            id: data.id,
            title: data.title,
            description: data.overview,
            posterUrl: POSTER_URL + data.poster_path,
            releaseDate: data.release_date,
            rating: data.vote_average,
            votes: data.vote_count,
            runtime: data.runtime,
            tagline: data.tagline,
            languages: data.spoken_languages.map((ld) => ld.english_name)
          } as Movie;

          return { ...s };
        });
      })
      .catch((err) => {
        update((s) => {
          s.activeStatus = ActionStatus.failed;
          s.activeError = err.message;
          return { ...s };
        });
      });

    update((s) => {
      s.activeStatus = ActionStatus.pending;
      s.active = null;
      return { ...s };
    });
  }

  return {
    subscribe,
    fetchMovies,
    fetchMovie
  };
}

const movieStore = createMovieStore();

/** Derived stores are the equivalent of Redux selectors */
export const movies = derived(movieStore, (s) => s.items);

export const moviesPage = derived(movieStore, (s) => s.itemsPage);

export const moviesStatus = derived(movieStore, (s) => s.itemsStatus);

export const moviesError = derived(movieStore, (s) => s.itemsError);

export const activeMovie = derived(movieStore, (s) => s.active);

export const activeMovieStatus = derived(movieStore, (s) => s.activeStatus);

export const activeMovieError = derived(movieStore, (s) => s.activeError);

export default movieStore;
