import type { GitHubTodo } from '../../types/github';

interface TodoListProps {
  todos: GitHubTodo[];
  githubUrl: string;
}

function TodoItem({ todo }: { todo: GitHubTodo }) {
  return (
    <li className="flex items-start gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
      <span className="text-base-content/40 text-lg mt-0.5">
        {todo.isHelpWanted ? '!' : todo.isGoodFirstIssue ? '*' : '○'}
      </span>
      <div className="flex-1 min-w-0">
        <a
          href={todo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-primary transition-colors"
        >
          {todo.title}
        </a>
        <div className="flex flex-wrap gap-2 mt-2">
          {todo.isHelpWanted && (
            <span className="badge badge-warning badge-sm">Hilfe gesucht</span>
          )}
          {todo.isGoodFirstIssue && (
            <span className="badge badge-success badge-sm">Für Einsteiger</span>
          )}
          {todo.assignee && (
            <span className="badge badge-ghost badge-sm">@{todo.assignee}</span>
          )}
        </div>
      </div>
      <a
        href={todo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost btn-xs"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </li>
  );
}

export function TodoList({ todos, githubUrl }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base-content/60 mb-4">
          Aktuell keine offenen Aufgaben.
        </p>
        <a
          href={`${githubUrl}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          Neue Aufgabe vorschlagen
        </a>
      </div>
    );
  }

  const helpWanted = todos.filter(t => t.isHelpWanted);
  const goodFirstIssue = todos.filter(t => t.isGoodFirstIssue && !t.isHelpWanted);
  const other = todos.filter(t => !t.isHelpWanted && !t.isGoodFirstIssue);

  return (
    <div className="space-y-6">
      {helpWanted.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="badge badge-warning">Hilfe gesucht</span>
          </h3>
          <ul className="space-y-3">
            {helpWanted.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}

      {goodFirstIssue.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="badge badge-success">Für Einsteiger</span>
          </h3>
          <ul className="space-y-3">
            {goodFirstIssue.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}

      {other.length > 0 && (
        <section>
          {(helpWanted.length > 0 || goodFirstIssue.length > 0) && (
            <h3 className="text-lg font-semibold mb-3">Weitere Aufgaben</h3>
          )}
          <ul className="space-y-3">
            {other.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}

      <div className="pt-4 border-t border-base-300">
        <a
          href={`${githubUrl}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          + Neue Aufgabe vorschlagen
        </a>
      </div>
    </div>
  );
}
