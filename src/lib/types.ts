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
};

/**
 * Data needed to display a social link at the bottom of the site layout.
 */
export type SocialLink = {
  /**
   * Name of the icon asset in **\/static** to display for the link
   */
  imgResource: string;
  /**
   * Alt text for the link icon
   */
  imgAlt: string;
  /**
   * Full URL where the link directs to
   */
  url: string;
};
