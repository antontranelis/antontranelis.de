import { useMemo, useState, useEffect, type ComponentType } from 'react';
import type { Project, ProjectData } from '../types';

// Typen für MDX-Module
interface MdxModule {
  default: ComponentType;
  frontmatter?: Record<string, unknown>;
  FlowsTab?: ComponentType;
  PersonasTab?: ComponentType;
  UserStoriesTab?: ComponentType;
  FAQTab?: ComponentType;
}

// Dynamischer Import aller .mdx Dateien
const mdxModules = import.meta.glob<MdxModule>('/src/content/projects/*.mdx');

// Dynamischer Import aller .md Dateien (als raw string)
const mdModules = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Einfacher Frontmatter-Parser für .md Dateien
function parseFrontmatter(content: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterStr = match[1];
  const markdown = match[2];
  const data: Record<string, unknown> = {};

  let currentKey: string | null = null;
  let currentArray: (string | Record<string, string>)[] | null = null;
  let currentObject: Record<string, string> | null = null;

  frontmatterStr.split('\n').forEach((line) => {
    const objectItemMatch = line.match(/^\s+-\s+(\w+):\s*(.*)$/);
    if (objectItemMatch) {
      if (currentObject !== null && currentArray !== null) {
        currentArray.push(currentObject);
      }
      currentObject = {};
      const [, key, value] = objectItemMatch;
      currentObject[key] = value.replace(/^["']|["']$/g, '');
      return;
    }

    const objectContinueMatch = line.match(/^\s{4,}(\w+):\s*(.*)$/);
    if (objectContinueMatch && currentObject !== null) {
      const [, key, value] = objectContinueMatch;
      currentObject[key] = value.replace(/^["']|["']$/g, '');
      return;
    }

    if (line.match(/^\s+-\s+/)) {
      if (currentObject !== null && currentArray !== null) {
        currentArray.push(currentObject);
        currentObject = null;
      }
      if (currentArray !== null) {
        const value = line
          .replace(/^\s+-\s+/, '')
          .trim()
          .replace(/^["']|["']$/g, '');
        currentArray.push(value);
      }
      return;
    }

    if (currentKey && currentArray !== null) {
      if (currentObject !== null) {
        currentArray.push(currentObject);
        currentObject = null;
      }
      data[currentKey] = currentArray;
      currentArray = null;
      currentKey = null;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (value === '') {
      currentKey = key;
      currentArray = [];
      return;
    }

    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        // bleibt String
      }
    }

    if (value === 'true') value = true;
    if (value === 'false') value = false;

    data[key] = value;
  });

  if (currentKey && currentArray !== null) {
    if (currentObject !== null) {
      (currentArray as (string | Record<string, string>)[]).push(currentObject);
    }
    data[currentKey] = currentArray;
  }

  return { data, content: markdown };
}

function extractProjectFromFrontmatter(
  slug: string,
  data: Record<string, unknown>
): Omit<Project, 'content'> {
  return {
    id: slug,
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    technologies: (data.technologies as string[]) || [],
    githubUrl: (data.githubUrl as string) || undefined,
    liveUrl: (data.liveUrl as string) || undefined,
    image: (data.image as string) || undefined,
    featured: (data.featured as boolean) || false,
    relatedProjects: (data.relatedProjects as string[]) || undefined,
    relatedArticles: (data.relatedArticles as string[]) || undefined,
    npmUrl: (data.npmUrl as string) || undefined,
    opencollectiveUrl: (data.opencollectiveUrl as string) || undefined,
    partners: (data.partners as string[]) || undefined,
    todos: (data.todos as string[]) || undefined,
    status: (data.status as string) || undefined,
    team: data.team as Project['team'],
    userStories: (data.userStories as string[]) || undefined,
    sort:
      typeof data.sort === 'number'
        ? data.sort
        : typeof data.sort === 'string'
          ? parseInt(data.sort, 10)
          : 999,
  };
}

export function useMdxProjects(): ProjectData[] {
  const [mdxProjects, setMdxProjects] = useState<ProjectData[]>([]);
  const [loaded, setLoaded] = useState(false);

  // MD-Projekte synchron laden
  const mdProjects = useMemo<ProjectData[]>(() => {
    return Object.entries(mdModules)
      .filter(([, rawContent]) => typeof rawContent === 'string')
      .map(([path, rawContent]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const { data, content } = parseFrontmatter(rawContent as string);
        const project = extractProjectFromFrontmatter(slug, data);

        return {
          ...project,
          content,
          isMdx: false as const,
        };
      });
  }, []);

  // MDX-Projekte asynchron laden
  useEffect(() => {
    async function loadMdxProjects() {
      const projects: ProjectData[] = [];

      for (const [path, importFn] of Object.entries(mdxModules)) {
        try {
          const module = await importFn();
          const slug = path.split('/').pop()?.replace('.mdx', '') || '';
          const frontmatter = module.frontmatter || {};
          const project = extractProjectFromFrontmatter(slug, frontmatter);

          projects.push({
            ...project,
            MdxContent: module.default,
            FlowsTab: module.FlowsTab,
            PersonasTab: module.PersonasTab,
            UserStoriesTab: module.UserStoriesTab,
            FAQTab: module.FAQTab,
            isMdx: true as const,
          });
        } catch (error) {
          console.error(`Failed to load MDX project: ${path}`, error);
        }
      }

      setMdxProjects(projects);
      setLoaded(true);
    }

    loadMdxProjects();
  }, []);

  // Kombiniere MD und MDX Projekte, sortiere nach sort-Attribut
  return useMemo(() => {
    // MDX überschreibt MD wenn gleicher Slug
    const mdxSlugs = new Set(mdxProjects.map((p) => p.id));
    const filteredMd = mdProjects.filter((p) => !mdxSlugs.has(p.id));

    const allProjects = [...filteredMd, ...mdxProjects];
    return allProjects.sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999));
  }, [mdProjects, mdxProjects, loaded]);
}
