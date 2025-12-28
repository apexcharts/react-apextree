import { useState } from 'react';
import { ApexTreeChart, type NodeData } from 'react-apextree';
import { basicOrgData } from '../data';

export function NodeClickExample() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [clickHistory, setClickHistory] = useState<string[]>([]);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node);
    setClickHistory((prev) => [node.name || node.id, ...prev.slice(0, 4)]);
  };

  const clearHistory = () => {
    setSelectedNode(null);
    setClickHistory([]);
  };

  return (
    <div className="example">
      <div className="example-header">
        <h2>Node Click Callback</h2>
        <p>Click on any node to see its data. The onNodeClick callback provides the node object.</p>
      </div>

      <div className="controls" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 500, color: '#333' }}>Selected:</span>
          {selectedNode ? (
            <span
              style={{
                padding: '4px 12px',
                background: '#e8eaf6',
                borderRadius: '4px',
                color: '#3949ab',
                fontWeight: 500,
              }}
            >
              {selectedNode.name || selectedNode.id}
            </span>
          ) : (
            <span style={{ color: '#999' }}>None - click a node</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#666', fontSize: '13px' }}>Recent:</span>
          {clickHistory.length > 0 ? (
            clickHistory.map((name, i) => (
              <span
                key={i}
                style={{
                  padding: '2px 8px',
                  background: i === 0 ? '#c5cae9' : '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#666',
                }}
              >
                {name}
              </span>
            ))
          ) : (
            <span style={{ color: '#999', fontSize: '13px' }}>No clicks yet</span>
          )}
          {clickHistory.length > 0 && (
            <button
              className="control-button"
              onClick={clearHistory}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          data={basicOrgData}
          width={800}
          height={450}
          direction="top"
          nodeWidth={120}
          nodeHeight={50}
          childrenSpacing={80}
          siblingSpacing={30}
          onNodeClick={handleNodeClick}
          highlightOnHover={true}
          nodeBGColor="#fff"
          nodeBGColorHover="#fff8e1"
          borderColor="#bdbdbd"
          borderColorHover="#ffa000"
          enableToolbar={true}
        />
      </div>
    </div>
  );
}
