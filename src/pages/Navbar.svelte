<script>
  import logo from "../assets/svelte.png";
</script>

<div id="navbar" class="d-flex align-items-center">
  <img alt="Svelte Logo" class="me-2" src={logo} />

  <h3 class="mb-0 text-white">Awesome Movie<strong>DB</strong></h3>
</div>

<style lang="scss">
  #navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #30384b;
    padding: 1rem 1.5rem;
    z-index: 10;

    img {
      width: 40px;
    }
  }
</style>
