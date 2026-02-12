export interface GitHubTodo {
  id: number;
  title: string;
  url: string;
  labels: string[];
  assignee?: string;
  createdAt: string;
  isHelpWanted: boolean;
  isGoodFirstIssue: boolean;
}

export interface GitHubContributor {
  login: string;
  avatar: string;
  contributions: number;
  profileUrl: string;
}

export interface GitHubRelease {
  tag: string;
  name: string;
  date: string;
  url: string;
}

export interface GitHubMilestone {
  title: string;
  description?: string;
  progress: number;
  dueDate?: string;
  url: string;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  openIssues: number;
}

export interface GitHubProjectData {
  slug: string;
  fetchedAt: string;
  stats: GitHubStats;
  todos: GitHubTodo[];
  researchQuestions: GitHubTodo[];
  contributors: GitHubContributor[];
  latestRelease: GitHubRelease | null;
  milestone: GitHubMilestone | null;
}

// Leere Daten als Fallback
export const emptyGitHubData: Omit<GitHubProjectData, 'slug'> = {
  fetchedAt: '',
  stats: { stars: 0, forks: 0, openIssues: 0 },
  todos: [],
  researchQuestions: [],
  contributors: [],
  latestRelease: null,
  milestone: null,
};
