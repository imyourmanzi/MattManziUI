import type { ComponentType } from 'svelte';

/**
 * Data needed to define a section of the website, like those seen in the nav bar.
 */
export type Section = {
  /**
   * Display name of the section
   */
  title: string;
  /**
   * Destination base URI to reach the section
   */
  destination: string;
  /**
   * Component that should be loaded at the destination
   */
  component: ComponentType;
};
