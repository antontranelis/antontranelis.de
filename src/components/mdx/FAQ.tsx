import { useState, type ReactNode } from 'react';

interface FAQItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

interface FAQGroupProps {
  title?: string;
  children: ReactNode;
}

export function FAQItem({ question, children, defaultOpen }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="collapse-title font-medium">{question}</div>
      <div className="collapse-content">
        <div className="pt-2 text-base-content/80">{children}</div>
      </div>
    </div>
  );
}

export function FAQGroup({ title, children }: FAQGroupProps) {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
