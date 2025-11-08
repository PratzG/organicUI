import React from 'react';
import '../styles/components.css';

export interface Position {
  row: number;
  col: number;
}

export interface TestButtonMetadata {
  link: string;
  buttonTitle: string;
}

export interface TestButtonProps {
  type: string;
  position: Position;
  metadata: TestButtonMetadata;
  inChat?: boolean;
}

const TestButton: React.FC<TestButtonProps> = ({ position, metadata, inChat = false }) => {
  const handleClick = () => {
    if (metadata.link) {
      window.location.href = metadata.link;
    }
  };

  if (inChat) {
    return (
      <button
        className="test-button"
        onClick={handleClick}
        style={{ width: '100%' }}
      >
        {metadata.buttonTitle || 'Click Me'}
      </button>
    );
  }

  return (
    <div
      className="organic-component test-button-wrapper"
      style={{
        gridColumn: position.col,
        gridRow: position.row,
        width: '100%'
      }}
    >
      <button
        className="test-button"
        onClick={handleClick}
      >
        {metadata.buttonTitle || 'Click Me'}
      </button>
    </div>
  );
};

export default TestButton;
