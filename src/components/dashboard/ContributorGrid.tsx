import type { GitHubContributor } from '../../types/github';
import type { TeamMember } from '../../types';

interface ContributorGridProps {
  contributors: GitHubContributor[];
  localTeam?: TeamMember[];
}

export function ContributorGrid({ contributors, localTeam }: ContributorGridProps) {
  if (contributors.length === 0) {
    return (
      <p className="text-base-content/60">
        Noch keine Contributors.
      </p>
    );
  }

  // Merge GitHub contributors with local team roles
  const enrichedContributors = contributors.map(contributor => {
    const localMember = localTeam?.find(
      t => t.github?.toLowerCase() === contributor.login.toLowerCase()
    );
    return {
      ...contributor,
      name: localMember?.name || contributor.login,
      role: localMember?.role,
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {enrichedContributors.map(contributor => (
        <a
          key={contributor.login}
          href={contributor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
        >
          <img
            src={contributor.avatar}
            alt={contributor.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{contributor.name}</div>
            {contributor.role && (
              <div className="text-xs text-base-content/60">{contributor.role}</div>
            )}
            <div className="text-xs text-base-content/40">
              {contributor.contributions} Commits
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
