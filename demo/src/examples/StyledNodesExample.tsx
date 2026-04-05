import { ApexTreeChart } from 'react-apextree';
import { styledTreeData } from '../data';

export function StyledNodesExample() {
  return (
    <div className="example">
      <div className="example-header">
        <h2>Per-Node Styling</h2>
        <p>Each node can have its own colors and styling via the options property.</p>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          data={styledTreeData}
          options={{
            width: 800,
            height: 500,
            direction: 'left',
            nodeWidth: 130,
            nodeHeight: 45,
            childrenSpacing: 120,
            siblingSpacing: 25,
            fontSize: '14px',
            fontWeight: '500',
            borderWidth: 2,
            borderRadius: '8px',
            highlightOnHover: true,
            enableToolbar: true,
          }}
        />
      </div>
    </div>
  );
}
