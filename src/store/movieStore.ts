import { derived, writable } from "svelte/store";
import axios from "axios";
import { API_KEY, POSTER_URL } from "../config";
import { ActionStatus } from "../utils";
import type Movie from "../models/movie";

interface MovieStoreData {
  items: Array<Movie>;
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
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      .then((res) => {
        update((s) => {
          delete s.itemsError;
          s.itemsPage = s.itemsPage + 1;
          s.itemsStatus = ActionStatus.success;
          s.items = res.data.results.map((d) => {
            return {
              id: d.id,
              title: d.title,
              description: d.overview,
              posterUrl: POSTER_URL + d.poster_path,
              releaseDate: d.release_date,
              rating: d.vote_average,
              votes: d.vote_count
            } as Movie;
          });

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
      return { ...s };
    });
  }

  return {
    subscribe,
    fetchMovies
  };
}

const movieStore = createMovieStore();

/** Derived stores are the equivalent of Redux selectors */
export const movies = derived(movieStore, (s) => s.items);

export const moviesPage = derived(movieStore, (s) => s.itemsPage);

export const moviesStatus = derived(movieStore, (s) => s.itemsStatus);

export const moviesError = derived(movieStore, (s) => s.itemsError);

export default movieStore;
