<script>
  import { fade, scale } from 'svelte/transition';
  export let show = false;
</script>

{#if show}
  <div>
    <h1
      in:scale
      out:fade
    >
      MORON
    </h1>
  </div>
{/if}

<style>
  div {
    position: fixed;
    z-index: 1000000;
    width: 100%;
    height: 100%;
    display: flex;
  }
  h1 {
    margin: auto;
    font-size: 10rem;
    color: red;
  }
</style>
