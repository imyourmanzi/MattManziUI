<script lang="ts">
  import DOMPurify from 'dompurify';
  import hljs from 'highlight.js/lib/core';
  import css from 'highlight.js/lib/languages/css';
  import javascript from 'highlight.js/lib/languages/javascript';
  import { Marked } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import Project from './Project.svelte';
  import './styles/projects.css';

  /**
   * The structure of a project.
   */
  type ProjectType = {
    /**
     * Source URI for a project image, if available
     */
    imageSource?: string;
    /**
     * Alternate text for the project image
     */
    imageAlternateText?: string;
    /**
     * Name to use in the heading
     */
    name: string;
    /**
     * Is the project currently being developed/maintained?
     */
    active?: boolean;
    /**
     * When was the project active?
     */
    dateRange: string;
    /**
     * Link to the best example of it, probably a GitHub link
     */
    projectLink?: string;
    /**
     * Filename prefix used to identify content to be display for this project
     *
     * There are two options for this file:
     *   - ${prefix}_description.md
     *   - ${prefix}_deepdive.md
     *
     * This content will show up in the similarly-named sections under the project heading.
     */
    markdownFilePrefix: string;
  };

  const projects: ProjectType[] = [
    {
      imageSource: '/img/projects/valleymatchposter.jpg',
      imageAlternateText: 'Official poster for the Valley Match fundraiser',
      name: 'Valley Match',
      dateRange: 'Jan – Feb 2016',
      projectLink: 'https://github.com/imyourmanzi/ValleyMatch',
      markdownFilePrefix: 'valleymatch'
    },
    {
      name: 'MattManzi.com (This Website)',
      active: true,
      dateRange: 'since 2015',
      projectLink: 'https://github.com/imyourmanzi/MattManziUI',
      markdownFilePrefix: 'mattmanzi-com'
    },
    {
      imageSource: '/img/projects/iosappicons.png',
      imageAlternateText: 'Icons of two iOS apps I developed',
      name: 'iOS: You Salty? & Time To Go',
      dateRange: 'Sep 2014 – May 2020',
      markdownFilePrefix: 'iosapps'
    }
  ];

  const projectMarkdownParser = new Marked();
  projectMarkdownParser.use(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, detectedLanguage) {
        const language = hljs.getLanguage(detectedLanguage)
          ? detectedLanguage
          : 'plaintext';

        return hljs.highlight(code, { language }).value;
      }
    })
  );

  /**
   * Laod in project content from relevant Markdown files and parse & sanitized them into
   * valid HTML.
   *
   * @param project the project whose content should be loaded
   * @returns an object with the relevant project content
   */
  const loadProjectContent = async (project: ProjectType) => {
    // import the content files
    const imports: Promise<typeof import('*?raw')>[] = [
      import(`./data/${project.markdownFilePrefix}_description.md?raw`),
      import(`./data/${project.markdownFilePrefix}_deepdive.md?raw`)
    ];

    // if a file imports properly, immediately get its raw value, parse, and sanitize it
    const chainedImports = imports.map((i) =>
      i
        .then((module) => module.default)
        .then((raw) => projectMarkdownParser.parse(raw))
        .then((parsed) => DOMPurify.sanitize(parsed))
    );

    const settledImports = await Promise.allSettled(chainedImports);

    // get either the final HTML of an imported file or nullify it
    const final = settledImports.map(
      (settled) => settled.status === 'fulfilled' && settled.value
    );

    return { description: final[0], deepDive: final[1] };
  };

  /**
   * Languages supported for code highlighting.
   */
  const supportedLanguages = [
    ['css', css],
    ['javascript', javascript]
  ] as const;

  // register all supported languages
  supportedLanguages.forEach(([supportedLanguage, languageFn]) => {
    hljs.registerLanguage(supportedLanguage, languageFn);
  });
</script>

<div id="projectsContainer" class="container">
  <h1>Projects</h1>

  {#each projects as project}
    {#await loadProjectContent(project) then content}
      <Project
        imageSource="{project.imageSource}"
        imageAlternateText="{project.imageAlternateText}"
        name="{project.name}"
        active="{project.active}"
        dateRange="{project.dateRange}"
        projectLink="{project.projectLink}"
      >
        <div slot="description">
          {@html content.description}
        </div>
        <div slot="deepDive">
          {@html content.deepDive}
        </div>
      </Project>
    {/await}
  {/each}
</div>
