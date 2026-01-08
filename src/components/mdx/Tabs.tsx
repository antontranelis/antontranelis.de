import { useState, type ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultTab?: number;
}

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tabs({ children, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Extract tab labels and content from children
  const tabs: { label: string; content: ReactNode }[] = [];

  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach((child) => {
    if (child && typeof child === 'object' && 'props' in child && child.props?.label) {
      tabs.push({
        label: child.props.label,
        content: child.props.children,
      });
    }
  });

  return (
    <div className="my-6">
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            className={`tab ${activeTab === index ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
