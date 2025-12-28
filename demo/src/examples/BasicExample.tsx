import { ApexTreeChart } from 'react-apextree';
import { basicOrgData } from '../data';

export function BasicExample() {
  return (
    <div className="example">
      <div className="example-header">
        <h2>Basic Organization Chart</h2>
        <p>A simple org chart with default styling and top-to-bottom layout.</p>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          data={basicOrgData}
          width={800}
          height={500}
          direction="top"
          nodeWidth={120}
          nodeHeight={50}
          childrenSpacing={80}
          siblingSpacing={30}
          highlightOnHover={true}
          enableToolbar={true}
        />
      </div>
    </div>
  );
}
