import type { GitHubStats, GitHubRelease, GitHubMilestone } from '../../types/github';

interface ProjectStatsProps {
  stats: GitHubStats;
  latestRelease?: GitHubRelease | null;
  milestone?: GitHubMilestone | null;
  githubUrl: string;
}

export function ProjectStats({ stats, latestRelease, milestone, githubUrl }: ProjectStatsProps) {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`${githubUrl}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge-lg gap-1 hover:badge-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {stats.stars}
        </a>
        <a
          href={`${githubUrl}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge-lg gap-1 hover:badge-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {stats.forks}
        </a>
        <a
          href={`${githubUrl}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge-lg gap-1 hover:badge-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {stats.openIssues} Issues
        </a>
      </div>

      {/* Latest Release */}
      {latestRelease && (
        <a
          href={latestRelease.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="font-mono font-medium">{latestRelease.tag}</span>
            <span className="text-base-content/60">
              {new Date(latestRelease.date).toLocaleDateString('de-DE')}
            </span>
          </div>
        </a>
      )}

      {/* Milestone Progress */}
      {milestone && (
        <a
          href={milestone.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{milestone.title}</span>
            <span className="text-xs text-base-content/60">{milestone.progress}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={milestone.progress}
            max="100"
          />
          {milestone.dueDate && (
            <div className="text-xs text-base-content/60 mt-1">
              Ziel: {new Date(milestone.dueDate).toLocaleDateString('de-DE')}
            </div>
          )}
        </a>
      )}
    </div>
  );
}
