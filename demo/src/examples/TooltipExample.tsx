import { ApexTreeChart } from 'react-apextree';
import { tooltipData, type TooltipPersonData } from '../data';

export function TooltipExample() {
  // custom tooltip template
  const tooltipTemplate = (content: TooltipPersonData) => {
    return `
      <div style="
        padding: 12px;
        font-family: Inter, sans-serif;
      ">
        <div style="
          font-weight: 600;
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
        ">
          ${content.name}
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 12px;">
            <span style="color: #666;">Role:</span>
            <span style="color: #333; margin-left: 4px;">${content.role}</span>
          </div>
          <div style="font-size: 12px;">
            <span style="color: #666;">Dept:</span>
            <span style="color: #333; margin-left: 4px;">${content.department}</span>
          </div>
          <div style="font-size: 12px;">
            <span style="color: #666;">Email:</span>
            <span style="color: #5c6bc0; margin-left: 4px;">${content.email}</span>
          </div>
        </div>
      </div>
    `;
  };

  // node template showing just the name
  const nodeTemplate = (content: TooltipPersonData) => {
    return `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 13px;
        font-weight: 500;
        padding: 8px;
        text-align: center;
      ">
        ${content.name}
      </div>
    `;
  };

  return (
    <div className="example">
      <div className="example-header">
        <h2>Custom Tooltips</h2>
        <p>Hover over nodes to see detailed information in a styled tooltip.</p>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          data={tooltipData}
          contentKey="data"
          width={800}
          height={450}
          direction="top"
          nodeWidth={150}
          nodeHeight={50}
          childrenSpacing={80}
          siblingSpacing={30}
          nodeTemplate={nodeTemplate as (content: unknown) => string}
          enableTooltip={true}
          tooltipTemplate={tooltipTemplate as (content: unknown) => string}
          tooltipMaxWidth={250}
          tooltipBGColor="#ffffff"
          tooltipBorderColor="#e0e0e0"
          highlightOnHover={true}
          nodeBGColor="#f5f5f5"
          nodeBGColorHover="#e8eaf6"
          borderColor="#9e9e9e"
          borderColorHover="#5c6bc0"
          enableToolbar={true}
        />
      </div>
    </div>
  );
}
