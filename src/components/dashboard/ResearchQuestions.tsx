import type { GitHubTodo } from '../../types/github';

interface ResearchQuestionsProps {
  questions: GitHubTodo[];
  githubUrl: string;
}

export function ResearchQuestions({ questions, githubUrl }: ResearchQuestionsProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {questions.map(question => (
          <li key={question.id} className="p-4 bg-base-200 rounded-lg">
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:text-primary transition-colors"
            >
              <span className="text-primary text-lg mt-0.5">?</span>
              <div className="flex-1">
                <span className="font-medium">{question.title}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {question.labels
                    .filter(l => !['type:research', 'research', 'question'].includes(l))
                    .map(label => (
                      <span key={label} className="badge badge-ghost badge-sm">
                        {label}
                      </span>
                    ))}
                </div>
              </div>
              <svg className="w-4 h-4 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-base-300">
        <a
          href={`${githubUrl}/issues/new?labels=type:research`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          + Forschungsfrage einreichen
        </a>
      </div>
    </div>
  );
}
