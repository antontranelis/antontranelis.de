import type { ReactNode } from 'react';

interface FlowStepProps {
  number?: number;
  title: string;
  children: ReactNode;
  icon?: string;
}

interface FlowDiagramProps {
  children: ReactNode;
  title?: string;
}

interface FlowArrowProps {
  direction?: 'down' | 'right';
}

export function FlowStep({ number, title, children, icon }: FlowStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-lg">
        {icon || number || '•'}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="font-semibold text-base mb-1">{title}</h4>
        <div className="text-sm text-base-content/80">{children}</div>
      </div>
    </div>
  );
}

export function FlowArrow({ direction = 'down' }: FlowArrowProps) {
  return (
    <div
      className={`flex ${direction === 'right' ? 'flex-row px-4' : 'flex-col pl-6 py-2'} items-center justify-center text-base-content/30`}
    >
      {direction === 'down' ? (
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
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      ) : (
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
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      )}
    </div>
  );
}

export function FlowDiagram({ children, title }: FlowDiagramProps) {
  return (
    <div className="my-8 p-6 bg-base-200 rounded-xl">
      {title && (
        <h3 className="text-lg font-semibold mb-6 text-center">{title}</h3>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

interface ThreeColumnFlowProps {
  children: ReactNode;
}

interface FlowColumnProps {
  title: string;
  icon?: string;
  children: ReactNode;
  highlight?: boolean;
}

export function ThreeColumnFlow({ children }: ThreeColumnFlowProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
  );
}

export function FlowColumn({
  title,
  icon,
  children,
  highlight,
}: FlowColumnProps) {
  return (
    <div
      className={`card ${highlight ? 'bg-primary text-primary-content' : 'bg-base-200'}`}
    >
      <div className="card-body p-4 text-center">
        {icon && <div className="text-3xl mb-2">{icon}</div>}
        <h4 className="font-bold text-sm uppercase tracking-wide mb-2">
          {title}
        </h4>
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
