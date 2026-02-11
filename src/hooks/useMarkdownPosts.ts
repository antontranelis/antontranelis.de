import { useMemo } from 'react';
import type { Post } from '../types';

// Dynamischer Import aller .md Dateien aus dem content/posts Ordner
const postModules = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Einfacher Frontmatter-Parser (Browser-kompatibel) mit Array-Support
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

export function useMarkdownPosts(): Post[] {
  return useMemo(() => {
    const posts = Object.entries(postModules).map(([path, rawContent]) => {
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      const { data, content } = parseFrontmatter(rawContent as string);

      return {
        title: (data.title as string) || 'Untitled',
        date: (data.date as string) || new Date().toISOString(),
        excerpt: (data.excerpt as string) || '',
        tags: (data.tags as string[]) || [],
        featured: (data.featured as boolean) || false,
        slug,
        content,
        externalUrl: (data.externalUrl as string) || undefined,
        // Sidebar data
        relatedProjects: (data.relatedProjects as string[]) || undefined,
        relatedArticles: (data.relatedArticles as string[]) || undefined,
        npmUrl: (data.npmUrl as string) || undefined,
        opencollectiveUrl: (data.opencollectiveUrl as string) || undefined,
        partners: (data.partners as string[]) || undefined,
        todos: (data.todos as string[]) || undefined,
      } as Post;
    });

    // Nach Datum sortieren (neueste zuerst)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);
}
