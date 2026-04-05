import { ApexTreeChart, type NestedNode } from 'react-apextree';
import { teamData, type PersonData } from '../data';

export function CustomTemplateExample() {
  const nodeTemplate = (content: PersonData) => {
    return `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 8px;
        gap: 6px;
      ">
        <img
          src="${content.imageURL}"
          alt="${content.name}"
          style="
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid #5c6bc0;
            object-fit: cover;
          "
        />
        <div style="text-align: center;">
          <div style="font-weight: 600; font-size: 12px; color: #333;">
            ${content.name}
          </div>
          <div style="font-size: 10px; color: #666;">
            ${content.title}
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="example">
      <div className="example-header">
        <h2>Custom Node Templates</h2>
        <p>Nodes with custom HTML templates showing avatars and styled content.</p>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          data={teamData as unknown as NestedNode}
          options={{
            contentKey: 'data',
            width: 800,
            height: 500,
            direction: 'top',
            nodeWidth: 140,
            nodeHeight: 100,
            childrenSpacing: 60,
            siblingSpacing: 20,
            nodeTemplate: nodeTemplate as unknown as (content: string) => string,
            borderRadius: '12px',
            borderColor: '#e0e0e0',
            borderColorHover: '#5c6bc0',
            nodeBGColor: '#ffffff',
            nodeBGColorHover: '#f5f5ff',
            enableToolbar: true,
          }}
        />
      </div>
    </div>
  );
}
