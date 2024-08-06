<script lang="ts">
  /**
   * This is a "hack" that Svelte sorta recommends because TypeScript support is
   * [still incomplete](https://svelte.dev/docs/typescript#experimental-advanced-typings).
   */
  interface $$Slots {
    /**
     * Expects HTML
     */
    description: any;
    /**
     * Expects HTML
     */
    deepDive: any;
  }

  export let imageSource: string | null = null;
  export let imageAlternateText: string | null = null;
  export let name: string;
  export let active: boolean = false;
  export let dateRange: string;
  export let projectLink: string | null = null;

  const projectHasImage = imageSource != null && imageAlternateText != null;
  let deepDiveIsOpen = false;

  const toggleDeepDive = () => {
    if (deepDiveIsOpen) {
      deepDiveIsOpen = false;
    } else {
      deepDiveIsOpen = true;
    }
  };
</script>

<div class="projectContainer">
  <div class="projectSummary">
    {#if projectHasImage}
      <img class="wideScreensOnly" src="{imageSource}" alt="{imageAlternateText}" />
    {/if}
    <div class="projectTextContainer" class:projectWithoutImage="{!projectHasImage}">
      <h2 class="projectName">{name}</h2>
      <div class="projectDetail">
        {#if active}
          <span class="projectActiveTag">Active</span>
        {/if}
        <span class="projectDateRange">{dateRange}</span>
      </div>
      <div class="projectDescription">
        <slot name="description"></slot>
        {#if projectLink}
          <div class="projectLink">
            <p>
              <a href="{projectLink}" target="_blank"
                >Project Link <sup
                  ><i class="fa-solid fa-arrow-up-right-from-square"></i></sup
                ></a
              >
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="projectDeepDive">
    <button on:click="{toggleDeepDive}"
      ><i class="fa-solid fa-chevron-down" class:chevronFlip="{deepDiveIsOpen}"
      ></i>&nbsp;Dive Deeper&nbsp;<i
        class="fa-solid fa-chevron-down"
        class:chevronFlip="{deepDiveIsOpen}"
      ></i></button
    >
    <div class="deepDiveContent" class:deepDiveOpen="{deepDiveIsOpen}">
      <slot name="deepDive"></slot>
    </div>
  </div>
</div>

<style>
  .projectContainer {
    margin-right: auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .projectSummary {
    display: flex;
    justify-content: space-evenly;
  }

  .projectSummary > img {
    width: 25%;
    max-height: 325px;
    padding-top: 3rem;
    object-fit: contain;
  }

  .projectTextContainer {
    width: 55%;
  }

  .projectWithoutImage {
    width: 60%;
  }

  .projectName {
    margin-bottom: 0;

    text-align: center;
  }

  .projectDetail {
    display: flex;
    justify-content: center;

    text-align: center;
    font-size: 0.9em;
  }

  .projectActiveTag {
    padding: 1px 6px;
    margin: auto 0.75em;

    background-color: #218e61;

    font-weight: 600;
  }

  .projectDateRange {
    font-style: italic;
  }

  .projectDescription {
    text-align: left;
  }

  .projectDeepDive {
    width: 85%;
    margin-left: 7.5%;
    margin-top: 0rem;

    text-align: center;
  }

  .projectDeepDive > button {
    font-size: 1.2rem;
  }

  .deepDiveContent {
    max-height: 0;
    overflow: hidden;

    background-color: #0a3052;
    padding: 0 2rem;
    box-shadow: inset rgb(1, 31, 58) 0 0 4rem 0.5rem;

    text-align: left;

    transition: max-height 0.5s;
  }

  .deepDiveOpen {
    max-height: 1000rem;
    transition: max-height 0.8s;
  }

  .fa-solid.fa-chevron-down {
    transition: transform 0.5s;
    transition-delay: 0.3s;
  }

  .fa-solid.fa-chevron-down.chevronFlip {
    transform: rotateX(0.5turn);
    transition: transform 0.5s;
  }

  /* Extra tall and skinny screens (i.e. smartphones) */
  @media screen and (max-aspect-ratio: 767/1024) {
    .projectTextContainer {
      width: 100%;
    }

    .projectWithoutImage {
      width: 100%;
    }
  }

  /* Light mode vs. dark mode (default) */
  @media screen and (prefers-color-scheme: light) {
    .projectActiveTag {
      background-color: rgb(136, 223, 161);
    }

    .deepDiveContent {
      background-color: #f5f4ee;
      box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 2rem -1.2rem;
    }
  }
</style>
