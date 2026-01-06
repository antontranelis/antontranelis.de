import { useMemo } from 'react';
import type { Project } from '../types';

// Dynamischer Import aller .md Dateien aus dem content/projects Ordner
const projectModules = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Einfacher Frontmatter-Parser (Browser-kompatibel)
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

  // Parse YAML-ähnliches Frontmatter mit Array-Support
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  frontmatterStr.split('\n').forEach(line => {
    // Array-Item (beginnt mit "  - ")
    if (line.match(/^\s+-\s+/)) {
      if (currentArray !== null) {
        const value = line.replace(/^\s+-\s+/, '').trim();
        currentArray.push(value);
      }
      return;
    }

    // Speichere vorheriges Array wenn vorhanden
    if (currentKey && currentArray !== null) {
      data[currentKey] = currentArray;
      currentArray = null;
      currentKey = null;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Leerer Wert nach Doppelpunkt = beginne Array
    if (value === '') {
      currentKey = key;
      currentArray = [];
      return;
    }

    // Entferne Anführungszeichen
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Parse Arrays (z.B. ["tag1", "tag2"])
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        // Fallback: bleibt String
      }
    }

    // Parse Booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    data[key] = value;
  });

  // Letztes Array speichern
  if (currentKey && currentArray !== null) {
    data[currentKey] = currentArray;
  }

  return { data, content: markdown };
}

export function useMarkdownProjects(): (Project & { content: string })[] {
  return useMemo(() => {
    const projects = Object.entries(projectModules).map(([path, rawContent]) => {
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
        content,
        // Sidebar data
        relatedProjects: (data.relatedProjects as string[]) || undefined,
        relatedArticles: (data.relatedArticles as string[]) || undefined,
        npmUrl: (data.npmUrl as string) || undefined,
        opencollectiveUrl: (data.opencollectiveUrl as string) || undefined,
        partners: (data.partners as string[]) || undefined,
        todos: (data.todos as string[]) || undefined,
      };
    });

    // Alphabetisch nach Titel sortieren
    return projects.sort((a, b) => a.title.localeCompare(b.title));
  }, []);
}
