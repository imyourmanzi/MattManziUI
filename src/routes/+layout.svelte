<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  $: sectionUri = $page.route.id?.split('/')[1];

  export let data: PageData;

  const { sections, socialLinks } = data;
</script>

<header class:dividedTop="{!!sectionUri}">
  <span id="siteTitleWrapper">
    <a class="siteTitleLink" href="/">
      <span id="siteTitle">MattManzi<span id="dotCom">.com</span></span>
    </a>
  </span>
  <nav id="navigationLinks">
    {#each sections as section (section.destination)}
      <a class="layoutLink" href="{section.destination}">
        <span class:currentPage="{sectionUri === section.destination}"
          >{section.title}</span
        >
      </a>
    {/each}
  </nav>
</header>
<slot />
<footer class:dividedBottom="{!!sectionUri}">
  <div id="socialLinks">
    {#each socialLinks as social (social.url)}
      <a href="{social.url}" class="socialLink" rel="noopener" target="_blank">
        <img src="{`img/${social.imgResource}`}" alt="{social.imgAlt}" />
      </a>
    {/each}
  </div>
  <br />
  <span
    ><i class="fas fa-laptop-code"></i> with <i class="fas fa-heart"></i> by
    <a
      class="layoutLink"
      href="https://github.com/imyourmanzi/MattManzi-UI"
      target="_blank"
      rel="noopener">imyourmanzi</a
    >
  </span>
</footer>

<style>
  /* Layout attributes */
  header {
    position: relative;
    width: 92%;
    padding: 2% 4% 1% 4%;
  }

  #siteTitleWrapper :global(.siteTitleLink) {
    color: inherit;
    font-size: 3em;
    font-weight: 300;
    text-decoration: none;
  }

  #siteTitleWrapper :global(.siteTitleLink):hover {
    opacity: 1;
  }

  #siteTitle > #dotCom {
    font-size: 50%;
  }

  .dividedTop {
    border-bottom: 1px solid gray;

    border-radius: 0;
  }

  .dividedBottom {
    border-top: 1px solid gray;

    border-radius: 0;
  }

  #navigationLinks {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
  }

  header :global(.layoutLink),
  footer :global(.layoutLink) {
    padding: 0em 1em;

    font-size: 1.25em;
    color: inherit;
    text-decoration: none;
  }

  header :global(.layoutLink:hover),
  footer :global(.layoutLink:hover) {
    text-decoration: underline;
  }

  a > span.currentPage {
    text-decoration: underline !important;
  }

  #socialLinks {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    padding: 1em 1em;
  }

  .socialLink {
    padding: 0 1.5em;

    cursor: pointer;
  }

  .socialLink img {
    height: 2rem;
  }

  footer {
    width: 100%;
    bottom: 0;
    padding: 0 0 1em 0;

    font-size: 0.82em;
  }

  footer .layoutLink {
    padding: 0;

    font-size: 100%;
  }

  /* Extra tall and skinny screens (i.e. smartphones) */
  @media screen and (max-aspect-ratio: 767/1024) {
    #navigationLinks {
      justify-content: space-around;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    }

    header :global(.layoutLink),
    footer :global(.layoutLink) {
      flex: 0 0 auto;
      padding: 0em 0.6em;
    }

    #socialLinks {
      justify-content: space-around;

      padding: 1em 0;
    }

    .socialLink {
      padding: 0;
    }
  }

  /* Light mode vs. dark mode (default) */
  @media screen and (prefers-color-scheme: light) {
    .socialLink img {
      filter: invert();
    }
  }
</style>
