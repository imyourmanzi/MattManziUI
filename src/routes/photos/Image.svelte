<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;

  let loaded = false;
  let thisImage: HTMLImageElement;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img
  alt="{alt}"
  src="{src}"
  class:loaded="{loaded}"
  bind:this="{thisImage}"
  loading="lazy"
/>

<style>
  img {
    max-width: 100%;
    max-height: 100%;

    opacity: 0;
    transition: opacity 1200ms ease-out;
  }

  img.loaded {
    opacity: 1;
  }
</style>
