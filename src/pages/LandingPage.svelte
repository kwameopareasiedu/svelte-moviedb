<script>
  import cinema from "../assets/cinema.jpg";
  import { ROUTE_MOVIES } from "../config";
  import { hashRoute } from "../utils";
</script>

<div id="landing-page" class="h-100">
  <div id="left-banner" class="h-100 d-flex justify-content-center">
    <div
      id="left-banner-content"
      class="h-100 py-5 d-flex flex-column justify-content-center justify-content-center justify-content-md-between align-items-center">
      <h2 class="d-none d-md-block">
        <span class="fw-light">Movie</span><strong>DB</strong>
      </h2>

      <div id="icons" class="d-flex flex-column">
        <button class="btn btn-link mb-2">
          <i class="bi-facebook" />
        </button>
        <button class="btn btn-link mb-2">
          <i class="bi-twitter" />
        </button>
        <button class="btn btn-link mb-2">
          <i class="bi-instagram" />
        </button>
      </div>

      <footer class="d-none d-md-block">
        <p class="mb-0">
          <small>
            <i>Made by <strong>Kwame</strong></i>
          </small>
        </p>
      </footer>
    </div>
  </div>

  <div id="banner-img" class="d-none d-md-block">
    <img src={cinema} alt="Cinema background" />
  </div>

  <main class="h-100">
    <div class="container h-100 py-5">
      <p class="mb-0 opacity-50">Welcome to the</p>
      <h1 class="fw-bold lh-1 mb-4">Awesome <br />Movie DB</h1>

      <p class="mb-2">
        <i>
          <small>
            My second Svelte app. Here, we'll be building a movie db app. Movie
            data will be obtained from an API and displayed in cards.
          </small>
        </i>
      </p>

      <p class="mb-4">
        <i>
          <small>
            When you click on a movie, you are redirected to the details page to
            see more about it. This utilizes <code>svelte-spa-router</code>.
          </small>
        </i>
      </p>

      <a
        type="button"
        href={hashRoute(ROUTE_MOVIES)}
        class="btn btn-primary btn-lg rounded-pill px-4">
        <small class="text-white fw-bold">See Movies</small>
      </a>
    </div>
  </main>
</div>

<style lang="scss">
  #landing-page {
    position: relative;

    #left-banner {
      position: fixed;
      top: 0;
      left: 0;
      border-bottom: 0;
      width: 50px;
      background-color: #30384b;

      @media screen and (min-width: 578px) {
        width: 100px;
      }

      @media screen and (min-width: 768px) {
        width: 250px;
      }

      * {
        color: white;
      }
    }

    #banner-img {
      position: fixed;
      top: 50%;
      left: 175px;
      width: 350px;
      height: 350px;
      transform: translateY(-50%);
      overflow: hidden;
      border-radius: 0 24px 0 25px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    main {
      display: grid;
      place-content: center;
      padding-left: 50px;

      h1 {
        font-size: 2.5rem;

        @media screen and (min-width: 768px) {
          font-size: 3.5rem;
        }
      }

      @media screen and (min-width: 768px) {
        padding-left: 525px;
      }

      .container {
        max-width: 250px;

        @media screen and (min-width: 576px) {
          max-width: 50%;
        }

        @media screen and (min-width: 768px) {
          max-width: 350px;
        }
      }
    }
  }
</style>
