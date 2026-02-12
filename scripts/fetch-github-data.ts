import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

// Types
interface ProjectConfig {
  slug: string;
  owner: string;
  repo: string;
}

interface GitHubTodo {
  id: number;
  title: string;
  url: string;
  labels: string[];
  assignee?: string;
  createdAt: string;
  isHelpWanted: boolean;
  isGoodFirstIssue: boolean;
}

interface GitHubContributor {
  login: string;
  avatar: string;
  contributions: number;
  profileUrl: string;
}

interface GitHubProjectData {
  slug: string;
  fetchedAt: string;
  stats: { stars: number; forks: number; openIssues: number };
  todos: GitHubTodo[];
  researchQuestions: GitHubTodo[];
  contributors: GitHubContributor[];
  latestRelease: { tag: string; name: string; date: string; url: string } | null;
  milestone: { title: string; description?: string; progress: number; dueDate?: string; url: string } | null;
}

// Parse frontmatter from MD/MDX files
function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

// Extract owner and repo from GitHub URL
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

// Auto-detect projects with githubUrl from content folder
function discoverProjects(): ProjectConfig[] {
  const contentDir = path.join(process.cwd(), 'src/content/projects');
  const projectMap = new Map<string, ProjectConfig>();

  if (!fs.existsSync(contentDir)) {
    console.error('Content directory not found:', contentDir);
    return [];
  }

  const files = fs.readdirSync(contentDir);

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter.githubUrl) {
      const parsed = parseGitHubUrl(frontmatter.githubUrl);
      if (parsed) {
        const slug = file.replace(/\.(md|mdx)$/, '');
        // MDX overwrites MD if same slug exists
        if (!projectMap.has(slug) || file.endsWith('.mdx')) {
          projectMap.set(slug, { slug, ...parsed });
          console.log(`Found project: ${slug} -> ${parsed.owner}/${parsed.repo}`);
        }
      }
    }
  }

  return Array.from(projectMap.values());
}

// Fetch data for a single project
async function fetchProjectData(
  octokit: Octokit,
  config: ProjectConfig
): Promise<GitHubProjectData> {
  const { slug, owner, repo } = config;
  console.log(`Fetching data for ${owner}/${repo}...`);

  try {
    // Parallel fetch for performance
    const [repoData, issues, contributors, releases, milestones] = await Promise.all([
      octokit.repos.get({ owner, repo }).catch(() => null),
      octokit.issues.listForRepo({
        owner,
        repo,
        state: 'open',
        per_page: 100
      }).catch(() => ({ data: [] })),
      octokit.repos.listContributors({
        owner,
        repo,
        per_page: 20
      }).catch(() => ({ data: [] })),
      octokit.repos.listReleases({
        owner,
        repo,
        per_page: 1
      }).catch(() => ({ data: [] })),
      octokit.issues.listMilestones({
        owner,
        repo,
        state: 'open',
        sort: 'due_on',
        direction: 'asc'
      }).catch(() => ({ data: [] })),
    ]);

    // Filter issues by labels
    const todos: GitHubTodo[] = issues.data
      .filter(issue => {
        const labels = issue.labels.map(l =>
          typeof l === 'string' ? l : l.name || ''
        );
        return labels.includes('type:todo') || labels.includes('todo');
      })
      .map(issue => {
        const labels = issue.labels.map(l =>
          typeof l === 'string' ? l : l.name || ''
        );
        return {
          id: issue.number,
          title: issue.title,
          url: issue.html_url,
          labels,
          assignee: issue.assignee?.login,
          createdAt: issue.created_at,
          isHelpWanted: labels.includes('help wanted') || labels.includes('status:help-wanted'),
          isGoodFirstIssue: labels.includes('good first issue') || labels.includes('status:good-first-issue'),
        };
      });

    const researchQuestions: GitHubTodo[] = issues.data
      .filter(issue => {
        const labels = issue.labels.map(l =>
          typeof l === 'string' ? l : l.name || ''
        );
        return labels.includes('type:research') || labels.includes('research') || labels.includes('question');
      })
      .map(issue => {
        const labels = issue.labels.map(l =>
          typeof l === 'string' ? l : l.name || ''
        );
        return {
          id: issue.number,
          title: issue.title,
          url: issue.html_url,
          labels,
          assignee: issue.assignee?.login,
          createdAt: issue.created_at,
          isHelpWanted: labels.includes('help wanted') || labels.includes('status:help-wanted'),
          isGoodFirstIssue: labels.includes('good first issue') || labels.includes('status:good-first-issue'),
        };
      });

    // Map contributors
    const mappedContributors: GitHubContributor[] = (contributors.data || [])
      .filter((c): c is NonNullable<typeof c> => c !== null && 'login' in c)
      .map(c => ({
        login: c.login || '',
        avatar: c.avatar_url || '',
        contributions: c.contributions || 0,
        profileUrl: c.html_url || '',
      }));

    // Latest release
    const latestRelease = releases.data[0] ? {
      tag: releases.data[0].tag_name,
      name: releases.data[0].name || releases.data[0].tag_name,
      date: releases.data[0].published_at || '',
      url: releases.data[0].html_url,
    } : null;

    // Active milestone
    const activeMilestone = milestones.data[0];
    const milestone = activeMilestone ? {
      title: activeMilestone.title,
      description: activeMilestone.description || undefined,
      progress: Math.round(
        (activeMilestone.closed_issues /
        Math.max(activeMilestone.open_issues + activeMilestone.closed_issues, 1)) * 100
      ),
      dueDate: activeMilestone.due_on || undefined,
      url: activeMilestone.html_url,
    } : null;

    return {
      slug,
      fetchedAt: new Date().toISOString(),
      stats: {
        stars: repoData?.data.stargazers_count || 0,
        forks: repoData?.data.forks_count || 0,
        openIssues: repoData?.data.open_issues_count || 0,
      },
      todos,
      researchQuestions,
      contributors: mappedContributors,
      latestRelease,
      milestone,
    };
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error);

    // Return empty data on error
    return {
      slug,
      fetchedAt: new Date().toISOString(),
      stats: { stars: 0, forks: 0, openIssues: 0 },
      todos: [],
      researchQuestions: [],
      contributors: [],
      latestRelease: null,
      milestone: null,
    };
  }
}

// Load cached data as fallback
function loadCachedData(slug: string): GitHubProjectData | null {
  const cachePath = path.join(process.cwd(), 'src/data/github', `${slug}.json`);
  if (fs.existsSync(cachePath)) {
    try {
      return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    } catch {
      return null;
    }
  }
  return null;
}

// Main function
async function main() {
  console.log('=== GitHub Data Fetch ===\n');

  // Initialize Octokit (with or without token)
  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit(token ? { auth: token } : {});

  if (!token) {
    console.warn('Warning: No GITHUB_TOKEN set. Rate limit is 60 requests/hour.\n');
  }

  // Discover projects
  const projects = discoverProjects();

  if (projects.length === 0) {
    console.log('No projects with githubUrl found.');
    return;
  }

  console.log(`\nFound ${projects.length} project(s) to fetch.\n`);

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'src/data/github');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Fetch data for each project
  for (const project of projects) {
    try {
      const data = await fetchProjectData(octokit, project);

      // Save to JSON file
      const outputPath = path.join(outputDir, `${project.slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`Saved: ${outputPath}`);
    } catch (error) {
      console.error(`Failed to fetch ${project.slug}:`, error);

      // Try to use cached data
      const cached = loadCachedData(project.slug);
      if (cached) {
        console.log(`Using cached data for ${project.slug}`);
      }
    }
  }

  // Generate index file
  const indexContent = `// Auto-generated - do not edit manually
// Run: npm run fetch:github

${projects.map(p => `import ${p.slug.replace(/-/g, '_')}Data from './${p.slug}.json';`).join('\n')}

import type { GitHubProjectData } from '../../types/github';

export const githubData: Record<string, GitHubProjectData> = {
${projects.map(p => `  '${p.slug}': ${p.slug.replace(/-/g, '_')}Data as GitHubProjectData,`).join('\n')}
};

export function getGitHubData(slug: string): GitHubProjectData | null {
  return githubData[slug] || null;
}
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log(`\nGenerated: src/data/github/index.ts`);

  console.log('\n=== Done ===');
}

main().catch(console.error);
