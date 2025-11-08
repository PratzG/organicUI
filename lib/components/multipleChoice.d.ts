import React from 'react';
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
declare const MultipleChoice: React.FC<MultipleChoiceProps>;
export default MultipleChoice;
//# sourceMappingURL=multipleChoice.d.ts.map