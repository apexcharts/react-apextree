import { useState } from 'react';
import {
  BasicExample,
  CustomTemplateExample,
  StyledNodesExample,
  ExpandCollapseExample,
  DynamicLayoutExample,
  TooltipExample,
  NodeClickExample,
} from './examples';

type ExampleKey =
  | 'basic'
  | 'custom-template'
  | 'styled-nodes'
  | 'expand-collapse'
  | 'dynamic-layout'
  | 'tooltips'
  | 'node-click';

const examples: { key: ExampleKey; label: string }[] = [
  { key: 'basic', label: 'Basic' },
  { key: 'custom-template', label: 'Custom Templates' },
  { key: 'styled-nodes', label: 'Styled Nodes' },
  { key: 'expand-collapse', label: 'Expand / Collapse' },
  { key: 'dynamic-layout', label: 'Dynamic Layout' },
  { key: 'tooltips', label: 'Tooltips' },
  { key: 'node-click', label: 'Node Click' },
];

const exampleComponents: Record<ExampleKey, React.FC> = {
  basic: BasicExample,
  'custom-template': CustomTemplateExample,
  'styled-nodes': StyledNodesExample,
  'expand-collapse': ExpandCollapseExample,
  'dynamic-layout': DynamicLayoutExample,
  tooltips: TooltipExample,
  'node-click': NodeClickExample,
};

function App() {
  const [activeExample, setActiveExample] = useState<ExampleKey>('basic');

  const ExampleComponent = exampleComponents[activeExample];

  return (
    <div className="app">
      <header className="app-header">
        <h1>React ApexTree</h1>
        <p>React wrapper for ApexTree - Interactive tree and org chart visualization</p>
      </header>

      <nav className="nav">
        {examples.map(({ key, label }) => (
          <button
            key={key}
            className={`nav-button ${activeExample === key ? 'active' : ''}`}
            onClick={() => setActiveExample(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main>
        <ExampleComponent />
      </main>
    </div>
  );
}

export default App;
