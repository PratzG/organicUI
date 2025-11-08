import React, { useState } from 'react';
import '../styles/components.css';

export interface Position {
  row: number;
  col: number;
}

export interface MultipleChoiceMetadata {
  questionNumber: number;
  question: string;
  options: [string, string, string, string];
}

export interface MultipleChoiceProps {
  type: string;
  position: Position;
  metadata: MultipleChoiceMetadata;
  inChat?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ position, metadata, inChat = false }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      console.log(`Question ${metadata.questionNumber}: Selected option ${selectedOption + 1}`);
    }
  };

  const renderContent = () => (
    <div className="multiple-choice-content">
      <div className="question-header">
        <span className="question-number">Question {metadata.questionNumber}</span>
      </div>
      <div className="question-text">{metadata.question}</div>
      <div className="options-container">
        {metadata.options.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name={`question-${metadata.questionNumber}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              disabled={submitted}
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={selectedOption === null || submitted}
      >
        {submitted ? 'Submitted' : 'Submit'}
      </button>
    </div>
  );

  if (inChat) {
    return (
      <div className="multiple-choice-wrapper chat-mode">
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      className="organic-component multiple-choice-wrapper"
      style={{
        gridColumn: position.col,
        gridRow: position.row,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default MultipleChoice;
