import { jsx as _jsx } from "react/jsx-runtime";
import '../styles/components.css';
const TestButton = ({ position, metadata, inChat = false }) => {
    const handleClick = () => {
        if (metadata.link) {
            window.location.href = metadata.link;
        }
    };
    if (inChat) {
        return (_jsx("button", { className: "test-button", onClick: handleClick, style: { width: '100%' }, children: metadata.buttonTitle || 'Click Me' }));
    }
    return (_jsx("div", { className: "organic-component test-button-wrapper", style: {
            gridColumn: position.col,
            gridRow: position.row,
            width: '100%'
        }, children: _jsx("button", { className: "test-button", onClick: handleClick, children: metadata.buttonTitle || 'Click Me' }) }));
};
export default TestButton;
