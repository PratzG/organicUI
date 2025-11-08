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
declare const TestButton: React.FC<TestButtonProps>;
export default TestButton;
//# sourceMappingURL=testButton.d.ts.map