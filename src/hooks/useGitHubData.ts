import type { GitHubProjectData } from '../types/github';
import { emptyGitHubData } from '../types/github';

// Import all GitHub data files
const githubDataModules = import.meta.glob<{ default: GitHubProjectData }>(
  '../data/github/*.json',
  { eager: true }
);

// Build lookup map
const githubDataMap: Record<string, GitHubProjectData> = {};

for (const [path, module] of Object.entries(githubDataModules)) {
  const slug = path.replace('../data/github/', '').replace('.json', '');
  if (module.default) {
    githubDataMap[slug] = module.default;
  }
}

/**
 * Get GitHub data for a project by slug
 * Returns null if no data exists for the project
 */
export function useGitHubData(slug: string): GitHubProjectData | null {
  return githubDataMap[slug] ?? null;
}

/**
 * Get GitHub data with fallback to empty data
 * Use this when you always need a valid object
 */
export function useGitHubDataWithFallback(slug: string): GitHubProjectData {
  return githubDataMap[slug] ?? { slug, ...emptyGitHubData };
}

/**
 * Get all available GitHub data
 */
export function useAllGitHubData(): Record<string, GitHubProjectData> {
  return githubDataMap;
}
