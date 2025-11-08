import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import '../styles/components.css';
const MultipleChoice = ({ position, metadata, inChat = false }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        if (selectedOption !== null) {
            setSubmitted(true);
            console.log(`Question ${metadata.questionNumber}: Selected option ${selectedOption + 1}`);
        }
    };
    const renderContent = () => (_jsxs("div", { className: "multiple-choice-content", children: [_jsx("div", { className: "question-header", children: _jsxs("span", { className: "question-number", children: ["Question ", metadata.questionNumber] }) }), _jsx("div", { className: "question-text", children: metadata.question }), _jsx("div", { className: "options-container", children: metadata.options.map((option, index) => (_jsxs("label", { className: "option-label", children: [_jsx("input", { type: "radio", name: `question-${metadata.questionNumber}`, value: index, checked: selectedOption === index, onChange: () => setSelectedOption(index), disabled: submitted }), _jsx("span", { className: "option-text", children: option })] }, index))) }), _jsx("button", { className: "submit-button", onClick: handleSubmit, disabled: selectedOption === null || submitted, children: submitted ? 'Submitted' : 'Submit' })] }));
    if (inChat) {
        return (_jsx("div", { className: "multiple-choice-wrapper chat-mode", children: renderContent() }));
    }
    return (_jsx("div", { className: "organic-component multiple-choice-wrapper", style: {
            gridColumn: position.col,
            gridRow: position.row,
        }, children: renderContent() }));
};
export default MultipleChoice;
