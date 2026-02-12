// Auto-generated - do not edit manually
// Run: npm run fetch:github

import maluhiaData from './maluhia.json';
import money_printingData from './money-printing.json';
import real_life_stackData from './real-life-stack.json';
import utopia_mapData from './utopia-map.json';
import web_of_trustData from './web-of-trust.json';

import type { GitHubProjectData } from '../../types/github';

export const githubData: Record<string, GitHubProjectData> = {
  'maluhia': maluhiaData as GitHubProjectData,
  'money-printing': money_printingData as GitHubProjectData,
  'real-life-stack': real_life_stackData as GitHubProjectData,
  'utopia-map': utopia_mapData as GitHubProjectData,
  'web-of-trust': web_of_trustData as GitHubProjectData,
};

export function getGitHubData(slug: string): GitHubProjectData | null {
  return githubData[slug] || null;
}
