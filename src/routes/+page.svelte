<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  const { sections } = data;
</script>

<div id="homeContainer" class="container">
  <p class="direct">As we say it,<br />so it shall be.</p>
  <div id="sectionBoxes">
    {#each sections as section (section.destination)}
      <div>
        <a class="sectionBoxLinkWrap" href="{section.destination}">
          <div class="sectionInnerBox">
            <p>{section.title}</p>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  #homeContainer {
    text-align: center !important;
  }

  .direct {
    width: 86%;
    margin: 1rem auto;

    font-size: 5.5rem;
    font-weight: 300;
    vertical-align: middle;
  }

  #sectionBoxes {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    width: 86%;
    margin: auto;
    max-width: 1200px;
  }

  #sectionBoxes :global(.sectionBoxLinkWrap) {
    padding: 0em 1em;

    color: inherit;
    text-decoration: none;
  }

  #sectionBoxes :global(.sectionBoxLinkWrap:hover) {
    color: gray;
  }

  .sectionInnerBox {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 21rem;
    height: 16rem;

    border: solid thin white;
  }

  .sectionInnerBox p {
    font-size: 2.5em;
  }

  @media screen and (prefers-color-scheme: light) {
    .sectionInnerBox {
      border: solid thin #011f3a;
    }
  }
</style>
