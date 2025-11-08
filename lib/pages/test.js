import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import OrganicCanvas from './organicCanvas';
import ChatCanvas from './chatCanvas';
import { addComponent, removeComponent, placeComponent, createReply } from '../actions';
import { updateCanvasParameters } from '../services/organicCanvasService';
import { Plus, Trash2, MapPin, MessageSquare, Check } from 'lucide-react';
import '../styles/pages.css';
const AVAILABLE_COMPONENTS = [
    { type: 'testButton', label: 'Test Button', description: 'A clickable button with link' },
    { type: 'multipleChoice', label: 'Multiple Choice', description: 'A question with 4 options' }
];
const Test = () => {
    const [selectedPage, setSelectedPage] = useState(null);
    const [canvasRows, setCanvasRows] = useState(2);
    const [canvasCols, setCanvasCols] = useState(5);
    const [canvasError, setCanvasError] = useState('');
    const [components, setComponents] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [isAddingComponent, setIsAddingComponent] = useState(false);
    const [isPlacingComponent, setIsPlacingComponent] = useState(false);
    const [selectedComponentType, setSelectedComponentType] = useState(null);
    const [buttonLink, setButtonLink] = useState('#');
    const [buttonTitle, setButtonTitle] = useState('Test Button');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState('What is the capital of France?');
    const [option1, setOption1] = useState('London');
    const [option2, setOption2] = useState('Paris');
    const [option3, setOption3] = useState('Berlin');
    const [option4, setOption4] = useState('Madrid');
    const [placeRow, setPlaceRow] = useState(1);
    const [placeCol, setPlaceCol] = useState(1);
    const [selectedComponentId, setSelectedComponentId] = useState('');
    const [placeError, setPlaceError] = useState('');
    const handleStartAdd = () => {
        setIsAddingComponent(true);
        setSelectedComponentType(null);
        setButtonLink('#');
        setButtonTitle('Test Button');
        setQuestionNumber(1);
        setQuestion('What is the capital of France?');
        setOption1('London');
        setOption2('Paris');
        setOption3('Berlin');
        setOption4('Madrid');
    };
    const handleSelectComponentType = (type) => {
        setSelectedComponentType(type);
    };
    const handleConfirmAdd = () => {
        if (!selectedComponentType)
            return;
        let metadata = {};
        if (selectedComponentType === 'testButton') {
            metadata = { link: buttonLink, buttonTitle };
        }
        else if (selectedComponentType === 'multipleChoice') {
            metadata = {
                questionNumber,
                question,
                options: [option1, option2, option3, option4]
            };
        }
        const newComponents = addComponent(components, {
            componentType: selectedComponentType,
            metadata
        });
        setComponents(newComponents);
        setIsAddingComponent(false);
        setSelectedComponentType(null);
    };
    const handleCancelAdd = () => {
        setIsAddingComponent(false);
        setSelectedComponentType(null);
    };
    const handleRemoveComponent = () => {
        if (!selectedComponentId)
            return;
        const newComponents = removeComponent(components, {
            componentId: selectedComponentId
        });
        setComponents(newComponents);
        setSelectedComponentId('');
    };
    const handleStartPlace = () => {
        if (!selectedComponentId)
            return;
        setIsPlacingComponent(true);
        setPlaceError('');
        const selectedComponent = components.find(c => c.id === selectedComponentId);
        if (selectedComponent) {
            if (selectedComponent.position.row >= 1 && selectedComponent.position.col >= 1) {
                setPlaceRow(selectedComponent.position.row);
                setPlaceCol(selectedComponent.position.col);
            }
            else {
                setPlaceRow(1);
                setPlaceCol(1);
            }
        }
    };
    const handleConfirmPlace = () => {
        if (!selectedComponentId)
            return;
        try {
            const newComponents = placeComponent(components, {
                componentId: selectedComponentId,
                newPosition: { row: placeRow, col: placeCol }
            });
            setComponents(newComponents);
            setIsPlacingComponent(false);
            setPlaceError('');
        }
        catch (error) {
            setPlaceError(error.message);
        }
    };
    const handleCancelPlace = () => {
        setIsPlacingComponent(false);
        setPlaceError('');
    };
    const handleReplyWithComponent = () => {
        if (!selectedComponentId)
            return;
        const component = createReply(components, { componentId: selectedComponentId });
        if (component) {
            const replyMessage = {
                id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'response',
                timestamp: new Date(),
                componentId: component.id
            };
            setChatMessages(prev => [...prev, replyMessage]);
        }
    };
    const renderSelectedPage = () => {
        if (selectedPage === 'organicCanvas') {
            return (_jsx(OrganicCanvas, { rows: canvasRows, cols: canvasCols, components: components }));
        }
        if (selectedPage === 'chatCanvas') {
            return _jsx(ChatCanvas, { components: components, messages: chatMessages });
        }
        return (_jsxs("div", { className: "test-welcome", children: [_jsx("h2", { children: "Test Page" }), _jsx("p", { children: "Select a page to test from the controls above" })] }));
    };
    const renderComponentParameters = () => {
        if (!selectedComponentType)
            return null;
        switch (selectedComponentType) {
            case 'testButton':
                return (_jsxs("div", { className: "input-group", children: [_jsxs("label", { children: ["Button Title:", _jsx("input", { type: "text", value: buttonTitle, onChange: (e) => setButtonTitle(e.target.value) })] }), _jsxs("label", { children: ["Link:", _jsx("input", { type: "text", value: buttonLink, onChange: (e) => setButtonLink(e.target.value) })] })] }));
            case 'multipleChoice':
                return (_jsxs("div", { className: "input-group", children: [_jsxs("label", { children: ["Question Number:", _jsx("input", { type: "number", min: "1", value: questionNumber, onChange: (e) => setQuestionNumber(Number(e.target.value)) })] }), _jsxs("label", { children: ["Question:", _jsx("input", { type: "text", value: question, onChange: (e) => setQuestion(e.target.value) })] }), _jsxs("label", { children: ["Option 1:", _jsx("input", { type: "text", value: option1, onChange: (e) => setOption1(e.target.value) })] }), _jsxs("label", { children: ["Option 2:", _jsx("input", { type: "text", value: option2, onChange: (e) => setOption2(e.target.value) })] }), _jsxs("label", { children: ["Option 3:", _jsx("input", { type: "text", value: option3, onChange: (e) => setOption3(e.target.value) })] }), _jsxs("label", { children: ["Option 4:", _jsx("input", { type: "text", value: option4, onChange: (e) => setOption4(e.target.value) })] })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "test-container", children: [_jsxs("div", { className: "test-controls", children: [_jsxs("div", { className: "control-section", children: [_jsx("h3", { children: "Page Selection" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: `control-button ${selectedPage === 'organicCanvas' ? 'active' : ''}`, onClick: () => setSelectedPage('organicCanvas'), children: "Organic Canvas" }), _jsx("button", { className: `control-button ${selectedPage === 'chatCanvas' ? 'active' : ''}`, onClick: () => setSelectedPage('chatCanvas'), children: "Chat Canvas" })] })] }), (selectedPage === 'organicCanvas' || selectedPage === 'chatCanvas') && (_jsxs(_Fragment, { children: [selectedPage === 'organicCanvas' && (_jsxs("div", { className: "control-section", children: [_jsx("h3", { children: "Canvas Parameters" }), canvasError && (_jsx("div", { className: "error-message", children: canvasError })), _jsxs("div", { className: "input-group", children: [_jsxs("label", { children: ["Rows:", _jsx("input", { type: "number", min: "1", max: "10", value: canvasRows, onChange: (e) => {
                                                            const newRows = Number(e.target.value);
                                                            const result = updateCanvasParameters(newRows, canvasCols, components);
                                                            if (result.success) {
                                                                setCanvasRows(newRows);
                                                                setComponents(result.components);
                                                                setCanvasError('');
                                                                if (result.movedComponents.length > 0) {
                                                                    console.log(`${result.movedComponents.length} component(s) moved to unplaced due to canvas resize`);
                                                                }
                                                            }
                                                            else {
                                                                setCanvasError(result.error || 'Invalid canvas parameters');
                                                            }
                                                        } })] }), _jsxs("label", { children: ["Columns:", _jsx("input", { type: "number", min: "1", max: "10", value: canvasCols, onChange: (e) => {
                                                            const newCols = Number(e.target.value);
                                                            const result = updateCanvasParameters(canvasRows, newCols, components);
                                                            if (result.success) {
                                                                setCanvasCols(newCols);
                                                                setComponents(result.components);
                                                                setCanvasError('');
                                                                if (result.movedComponents.length > 0) {
                                                                    console.log(`${result.movedComponents.length} component(s) moved to unplaced due to canvas resize`);
                                                                }
                                                            }
                                                            else {
                                                                setCanvasError(result.error || 'Invalid canvas parameters');
                                                            }
                                                        } })] })] })] })), _jsxs("div", { className: "control-section", children: [_jsx("h3", { children: "Component Actions" }), _jsxs("div", { className: "action-buttons", children: [_jsxs("button", { className: "action-button add", onClick: handleStartAdd, disabled: isAddingComponent || isPlacingComponent, title: "Add Component", children: [_jsx(Plus, { size: 18 }), "Add"] }), _jsxs("button", { className: "action-button remove", onClick: handleRemoveComponent, disabled: !selectedComponentId || isAddingComponent || isPlacingComponent, title: "Remove Component", children: [_jsx(Trash2, { size: 18 }), "Remove"] }), selectedPage === 'organicCanvas' && (_jsxs("button", { className: "action-button place", onClick: handleStartPlace, disabled: !selectedComponentId || isAddingComponent || isPlacingComponent, title: "Place Component on Grid", children: [_jsx(MapPin, { size: 18 }), "Place"] })), selectedPage === 'chatCanvas' && (_jsxs("button", { className: "action-button reply", onClick: handleReplyWithComponent, disabled: !selectedComponentId || isAddingComponent || isPlacingComponent, title: "Reply with Component", children: [_jsx(MessageSquare, { size: 18 }), "Reply"] }))] })] }), components.length > 0 && (_jsxs("div", { className: "control-section", children: [_jsx("h3", { children: "Existing Components" }), _jsx("div", { className: "component-list", children: components.map((component) => (_jsx("div", { className: `component-item ${selectedComponentId === component.id ? 'selected' : ''}`, onClick: () => !isAddingComponent && !isPlacingComponent && setSelectedComponentId(component.id), children: _jsxs("div", { className: "component-info", children: [_jsx("strong", { children: component.type }), _jsx("span", { children: component.position.row === -1 && component.position.col === -1
                                                            ? 'Position: Unplaced'
                                                            : `Position: (${component.position.row}, ${component.position.col})` }), _jsx("span", { className: "component-title", children: component.metadata.buttonTitle })] }) }, component.id))) })] })), isAddingComponent && (_jsxs("div", { className: "control-section adding-component", children: [_jsx("h3", { children: "Select Component Type" }), _jsx("div", { className: "component-type-list", children: AVAILABLE_COMPONENTS.map((comp) => (_jsxs("div", { className: `component-type-item ${selectedComponentType === comp.type ? 'selected' : ''}`, onClick: () => handleSelectComponentType(comp.type), children: [_jsxs("div", { className: "component-type-info", children: [_jsx("strong", { children: comp.label }), _jsx("span", { children: comp.description })] }), selectedComponentType === comp.type && (_jsx(Check, { size: 20, className: "check-icon" }))] }, comp.type))) }), selectedComponentType && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "control-section", children: [_jsx("h3", { children: "Component Parameters" }), renderComponentParameters()] }), _jsxs("div", { className: "add-actions", children: [_jsxs("button", { className: "confirm-button", onClick: handleConfirmAdd, children: [_jsx(Check, { size: 18 }), "Confirm Add"] }), _jsx("button", { className: "cancel-button", onClick: handleCancelAdd, children: "Cancel" })] })] }))] })), isPlacingComponent && selectedPage === 'organicCanvas' && (_jsxs("div", { className: "control-section placing-component", children: [_jsx("h3", { children: "Place Component on Grid" }), placeError && (_jsx("div", { className: "error-message", children: placeError })), _jsxs("div", { className: "input-group", children: [_jsxs("label", { children: ["Position Row:", _jsx("input", { type: "number", min: "1", max: canvasRows, value: placeRow, onChange: (e) => setPlaceRow(Number(e.target.value)) })] }), _jsxs("label", { children: ["Position Column:", _jsx("input", { type: "number", min: "1", max: canvasCols, value: placeCol, onChange: (e) => setPlaceCol(Number(e.target.value)) })] })] }), _jsxs("div", { className: "add-actions", children: [_jsxs("button", { className: "confirm-button", onClick: handleConfirmPlace, children: [_jsx(Check, { size: 18 }), "Confirm Place"] }), _jsx("button", { className: "cancel-button", onClick: handleCancelPlace, children: "Cancel" })] })] }))] }))] }), _jsx("div", { className: "test-preview", children: renderSelectedPage() })] }));
};
export default Test;
