import { useRef, useState } from 'react';
import { ApexTreeChart, type ApexTreeRef } from 'react-apextree';
import { expandableTreeData } from '../data';

export function ExpandCollapseExample() {
  const treeRef = useRef<ApexTreeRef>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

  const collapsibleNodes = [
    { id: 'engineering', label: 'Engineering' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'devops', label: 'DevOps' },
    { id: 'product', label: 'Product' },
    { id: 'sales', label: 'Sales' },
  ];

  const toggleNode = (nodeId: string) => {
    if (collapsedNodes.has(nodeId)) {
      treeRef.current?.expand(nodeId);
      setCollapsedNodes((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    } else {
      treeRef.current?.collapse(nodeId);
      setCollapsedNodes((prev) => new Set(prev).add(nodeId));
    }
  };

  const expandAll = () => {
    collapsedNodes.forEach((nodeId) => {
      treeRef.current?.expand(nodeId);
    });
    setCollapsedNodes(new Set());
  };

  const collapseAll = () => {
    collapsibleNodes.forEach(({ id }) => {
      treeRef.current?.collapse(id);
    });
    setCollapsedNodes(new Set(collapsibleNodes.map((n) => n.id)));
  };

  return (
    <div className="example">
      <div className="example-header">
        <h2>Expand / Collapse</h2>
        <p>Control node visibility programmatically using ref methods.</p>
      </div>

      <div className="controls">
        <button className="control-button" onClick={expandAll}>
          Expand All
        </button>
        <button className="control-button" onClick={collapseAll}>
          Collapse All
        </button>
        <span style={{ margin: '0 8px', color: '#999' }}>|</span>
        {collapsibleNodes.map(({ id, label }) => (
          <button
            key={id}
            className={`control-button ${collapsedNodes.has(id) ? '' : 'active'}`}
            onClick={() => toggleNode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tree-container">
        <ApexTreeChart
          ref={treeRef}
          data={expandableTreeData}
          options={{
            width: 800,
            height: 500,
            direction: 'top',
            nodeWidth: 120,
            nodeHeight: 45,
            childrenSpacing: 70,
            siblingSpacing: 20,
            enableExpandCollapse: true,
            highlightOnHover: true,
            enableToolbar: true,
            nodeBGColor: '#fff',
            borderColor: '#5c6bc0',
            borderColorHover: '#3949ab',
            fontColor: '#333',
          }}
        />
      </div>
    </div>
  );
}
