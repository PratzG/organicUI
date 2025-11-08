import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TestButton from '../components/testButton';
import MultipleChoice from '../components/multipleChoice';
import '../styles/pages.css';
const OrganicCanvas = ({ rows = 2, cols = 5, components = [] }) => {
    const gridCells = Array.from({ length: rows * cols }, (_, i) => i);
    const placedComponents = components.filter(component => component.position.row >= 1 && component.position.col >= 1);
    const renderComponent = (component) => {
        switch (component.type) {
            case 'testButton':
                return (_jsx(TestButton, { type: component.type, position: component.position, metadata: component.metadata }, component.id));
            case 'multipleChoice':
                return (_jsx(MultipleChoice, { type: component.type, position: component.position, metadata: component.metadata }, component.id));
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "organic-canvas-container", children: _jsxs("div", { className: "organic-canvas-grid", style: {
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`
            }, children: [gridCells.map((index) => (_jsx("div", { className: "grid-cell", children: _jsx("div", { className: "cell-content" }) }, index))), placedComponents.map(component => renderComponent(component))] }) }));
};
export default OrganicCanvas;
