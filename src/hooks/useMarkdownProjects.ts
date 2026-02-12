import { useMemo } from 'react';
import type { Project, TeamMember } from '../types';

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

  // Parse YAML-ähnliches Frontmatter mit Array-Support und Objekt-Arrays
  let currentKey: string | null = null;
  let currentArray: (string | Record<string, string>)[] | null = null;
  let currentObject: Record<string, string> | null = null;

  frontmatterStr.split('\n').forEach(line => {
    // Objekt-Array-Item (beginnt mit "  - " gefolgt von key: value)
    const objectItemMatch = line.match(/^\s+-\s+(\w+):\s*(.*)$/);
    if (objectItemMatch) {
      // Neues Objekt im Array beginnen
      if (currentObject !== null && currentArray !== null) {
        currentArray.push(currentObject);
      }
      currentObject = {};
      const [, key, value] = objectItemMatch;
      currentObject[key] = value.replace(/^["']|["']$/g, '');
      return;
    }

    // Objekt-Fortsetzung (beginnt mit "    " gefolgt von key: value, tiefere Einrückung)
    const objectContinueMatch = line.match(/^\s{4,}(\w+):\s*(.*)$/);
    if (objectContinueMatch && currentObject !== null) {
      const [, key, value] = objectContinueMatch;
      currentObject[key] = value.replace(/^["']|["']$/g, '');
      return;
    }

    // Einfaches Array-Item (beginnt mit "  - ")
    if (line.match(/^\s+-\s+/)) {
      // Vorheriges Objekt speichern falls vorhanden
      if (currentObject !== null && currentArray !== null) {
        currentArray.push(currentObject);
        currentObject = null;
      }
      if (currentArray !== null) {
        const value = line.replace(/^\s+-\s+/, '').trim().replace(/^["']|["']$/g, '');
        currentArray.push(value);
      }
      return;
    }

    // Speichere vorheriges Array wenn vorhanden (neue Key-Value-Zeile)
    if (currentKey && currentArray !== null) {
      // Letztes Objekt speichern falls vorhanden
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
    if (currentObject !== null) {
      (currentArray as (string | Record<string, string>)[]).push(currentObject);
    }
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
        // Neue Felder
        status: (data.status as string) || undefined,
        team: (data.team as TeamMember[]) || undefined,
        userStories: (data.userStories as string[]) || undefined,
        sort: typeof data.sort === 'number' ? data.sort : (typeof data.sort === 'string' ? parseInt(data.sort, 10) : 999),
        active: data.active !== false,
      };
    });

    // Inaktive Projekte ausfiltern, dann nach sort-Attribut sortieren
    return projects
      .filter(p => p.active !== false)
      .sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999));
  }, []);
}
