import { useRef, useState } from 'react';
import { ApexTreeChart, type ApexTreeRef, type TreeDirection } from 'react-apextree';
import { basicOrgData } from '../data';

const directions: { value: TreeDirection; label: string; icon: string }[] = [
  { value: 'top', label: 'Top to Bottom', icon: '↓' },
  { value: 'bottom', label: 'Bottom to Top', icon: '↑' },
  { value: 'left', label: 'Left to Right', icon: '→' },
  { value: 'right', label: 'Right to Left', icon: '←' },
];

export function DynamicLayoutExample() {
  const treeRef = useRef<ApexTreeRef>(null);
  const [currentDirection, setCurrentDirection] = useState<TreeDirection>('top');

  const handleDirectionChange = (direction: TreeDirection) => {
    treeRef.current?.changeLayout(direction);
    setCurrentDirection(direction);
  };

  const handleFitScreen = () => {
    treeRef.current?.fitScreen();
  };

  return (
    <div className="example">
      <div className="example-header">
        <h2>Dynamic Layout</h2>
        <p>Change the tree direction on the fly using ref methods.</p>
      </div>

      <div className="controls">
        {directions.map(({ value, label, icon }) => (
          <button
            key={value}
            className={`control-button ${currentDirection === value ? 'active' : ''}`}
            onClick={() => handleDirectionChange(value)}
          >
            {icon} {label}
          </button>
        ))}
        <span style={{ margin: '0 8px', color: '#999' }}>|</span>
        <button className="control-button" onClick={handleFitScreen}>
          Fit Screen
        </button>
      </div>

      <div className="tree-container">
        <ApexTreeChart
          ref={treeRef}
          data={basicOrgData}
          width={800}
          height={500}
          direction={currentDirection}
          nodeWidth={120}
          nodeHeight={50}
          childrenSpacing={80}
          siblingSpacing={30}
          highlightOnHover={true}
          nodeBGColor="#e3f2fd"
          nodeBGColorHover="#bbdefb"
          borderColor="#2196f3"
          borderColorHover="#1976d2"
          fontColor="#1565c0"
        />
      </div>
    </div>
  );
}
