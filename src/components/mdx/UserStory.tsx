import type { ReactNode } from 'react';

interface UserStoryProps {
  as: string;
  want: string;
  so: string;
}

interface UserStoryGridProps {
  children: ReactNode;
}

interface UserStoryTableProps {
  title: string;
  children: ReactNode;
}

interface UserStoryRowProps {
  as: string;
  want: string;
  so: string;
}

export function UserStory({ as, want, so }: UserStoryProps) {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-4">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Als</span> {as}
          </p>
          <p>
            <span className="font-semibold">möchte ich</span> {want}
          </p>
          <p>
            <span className="font-semibold">damit</span> {so}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserStoryGrid({ children }: UserStoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">{children}</div>
  );
}

export function UserStoryTable({ title, children }: UserStoryTableProps) {
  return (
    <div className="collapse collapse-arrow bg-base-200 my-2">
      <input type="checkbox" />
      <div className="collapse-title text-lg font-semibold">{title}</div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table bg-base-100">
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function UserStoryRow({ as, want, so }: UserStoryRowProps) {
  return (
    <tr className="hover">
      <td>
        <span className="font-semibold">Als</span> {as}
      </td>
      <td>
        <span className="font-semibold">möchte ich</span> {want}
      </td>
      <td>
        <span className="font-semibold">damit</span> {so}
      </td>
    </tr>
  );
}
