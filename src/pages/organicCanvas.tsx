import React from 'react';
import { ComponentInstance } from '../actions';
import TestButton from '../components/testButton';
import MultipleChoice from '../components/multipleChoice';
import '../styles/pages.css';

interface OrganicCanvasProps {
  rows?: number;
  cols?: number;
  components?: ComponentInstance[];
}

const OrganicCanvas: React.FC<OrganicCanvasProps> = ({
  rows = 2,
  cols = 5,
  components = []
}) => {
  const gridCells = Array.from({ length: rows * cols }, (_, i) => i);

  const placedComponents = components.filter(
    component => component.position.row >= 1 && component.position.col >= 1
  );

  const renderComponent = (component: ComponentInstance) => {
    switch (component.type) {
      case 'testButton':
        return (
          <TestButton
            key={component.id}
            type={component.type}
            position={component.position}
            metadata={component.metadata}
          />
        );
      case 'multipleChoice':
        return (
          <MultipleChoice
            key={component.id}
            type={component.type}
            position={component.position}
            metadata={component.metadata}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="organic-canvas-container">
      <div
        className="organic-canvas-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {gridCells.map((index) => (
          <div key={index} className="grid-cell">
            <div className="cell-content">
            </div>
          </div>
        ))}
        {placedComponents.map(component => renderComponent(component))}
      </div>
    </div>
  );
};

export default OrganicCanvas;
