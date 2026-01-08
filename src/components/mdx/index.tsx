export { Persona, PersonaSection, CriticalMoment } from './Persona';
export { UserStory, UserStoryGrid, UserStoryTable, UserStoryRow } from './UserStory';
export {
  FlowDiagram,
  FlowStep,
  FlowArrow,
  ThreeColumnFlow,
  FlowColumn,
} from './FlowDiagram';
export { FAQItem, FAQGroup } from './FAQ';
export { Callout } from './Callout';
export { ComparisonTable, ComparisonRow } from './ComparisonTable';
export { QROnboardingFlow } from './QROnboardingFlow';
export { OnboardingFlowDiagram } from './OnboardingFlowDiagram';
export { VerificationFlowDiagram } from './VerificationFlowDiagram';
export { AttestationFlowDiagram } from './AttestationFlowDiagram';
export { Tabs, Tab } from './Tabs';

// MDX Provider components - diese werden automatisch für MDX-Content verwendet
export const mdxComponents = {
  // Standard HTML-Elemente können hier überschrieben werden
  // z.B. h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
};
