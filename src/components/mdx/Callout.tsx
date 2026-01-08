import type { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: ReactNode;
}

const icons = {
  info: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  success: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const alertClasses = {
  info: 'bg-base-200 text-base-content',
  warning: 'bg-warning/10 text-warning-content border-warning/30',
  success: 'bg-success/10 text-success-content border-success/30',
  error: 'bg-error/10 text-error-content border-error/30',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`alert ${alertClasses[type]} my-4 border`}>
      {icons[type]}
      <div>
        {title && <h4 className="font-bold">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
