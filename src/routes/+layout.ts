import type { Section, SocialLink } from '$lib/types';
import type { LayoutLoad } from './$types';

/**
 * Sections of the website.
 */
const sections: Section[] = [
  {
    title: 'Résumé',
    destination: 'resume'
  },
  {
    title: 'Projects',
    destination: 'projects'
  }
];

/**
 * Links in the footer that send people to social media and the like.
 */
const socialLinks: SocialLink[] = [
  {
    imgResource: 'social_git.svg',
    imgAlt: 'Link to GitHub profile',
    url: 'https://github.com/imyourmanzi'
  },
  {
    imgResource: 'social_in.png',
    imgAlt: 'Link to LinkedIn profile',
    url: 'https://www.linkedin.com/in/mattrmanzi/'
  }
];

export const load: LayoutLoad = () => {
  return { sections, socialLinks };
};
