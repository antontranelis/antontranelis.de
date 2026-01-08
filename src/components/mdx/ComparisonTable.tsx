import type { ReactNode } from 'react';

interface ComparisonTableProps {
  before: string;
  after: string;
  children: ReactNode;
}

interface ComparisonRowProps {
  before: ReactNode;
  after: ReactNode;
}

export function ComparisonTable({
  before,
  after,
  children,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>{before}</th>
            <th>{after}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function ComparisonRow({ before, after }: ComparisonRowProps) {
  return (
    <tr>
      <td>{before}</td>
      <td>{after}</td>
    </tr>
  );
}
