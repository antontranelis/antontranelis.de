import { useMemo } from 'react';
import type { ProjectData } from '../types';

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

export function useMdxProjects(): ProjectData[] {
  return useMemo<ProjectData[]>(() => {
    return Object.entries(mdModules)
      .filter(([, rawContent]) => typeof rawContent === 'string')
      .map(([path, rawContent]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const { data, content } = parseFrontmatter(rawContent as string);

        return {
          id: slug,
          title: (data.title as string) || 'Untitled',
          description: (data.description as string) || '',
          technologies: (data.technologies as string[]) || [],
          githubUrl: (data.githubUrl as string) || undefined,
          liveUrl: (data.liveUrl as string) || undefined,
          image: (data.image as string) || undefined,
          featured: (data.featured as boolean) || false,
          status: (data.status as string) || undefined,
          team: data.team as ProjectData['team'],
          sort:
            typeof data.sort === 'number'
              ? data.sort
              : typeof data.sort === 'string'
                ? parseInt(data.sort, 10)
                : 999,
          active: data.active !== false,
          content,
          isMdx: false as const,
        };
      })
      .filter(p => p.active !== false)
      .sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999));
  }, []);
}
