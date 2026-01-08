import { useState, type ReactNode } from 'react';

interface PersonaProps {
  name: string;
  emoji?: string;
  avatar?: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

interface PersonaSectionProps {
  title: string;
  children: ReactNode;
}

interface CriticalMomentProps {
  problem: string;
  solution: string;
  solutionIcon?: 'check' | 'exclamation';
}

export function Persona({ name, emoji, avatar, subtitle, children, defaultOpen = false }: PersonaProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="collapse-title">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 object-contain" />
          ) : emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : null}
          <div>
            <h3 className="text-lg font-bold m-0 leading-none">{name}</h3>
            {subtitle && (
              <span className="text-sm text-base-content/60">{subtitle}</span>
            )}
          </div>
        </div>
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PersonaSection({ title, children }: PersonaSectionProps) {
  const isGoals = title === 'Ziele';

  return (
    <div className="rounded-lg p-3 bg-base-200">
      <h4 className="font-semibold text-xs uppercase tracking-wide mb-1 text-base-content/50">
        {title}
      </h4>
      <div className={`text-sm leading-relaxed ${isGoals ? 'goals-list' : ''}`}>
        {children}
      </div>
      {isGoals && (
        <style>{`
          .goals-list ul { list-style: none; padding-left: 0; margin: 0; }
          .goals-list li { display: flex; align-items: flex-start; gap: 0.5rem; }
          .goals-list li::before { content: '☐'; flex-shrink: 0; }
        `}</style>
      )}
    </div>
  );
}

export function CriticalMoment({ problem, solution, solutionIcon = 'check' }: CriticalMomentProps) {
  return (
    <div className="rounded-lg p-3 bg-base-200">
      <h4 className="font-semibold text-xs uppercase tracking-wide mb-4 text-base-content/50">
        Kritischer Moment
      </h4>
      <div className="text-sm space-y-2 mt-4">
        <div className="flex gap-2 items-start">
          <span className="shrink-0">⚠️</span>
          <span>{problem}</span>
        </div>
        <div className="flex gap-2 items-start">
          <span className="shrink-0">{solutionIcon === 'exclamation' ? '❕' : '✅'}</span>
          <span>{solution}</span>
        </div>
      </div>
    </div>
  );
}
