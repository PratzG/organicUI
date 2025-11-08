import React, { useState } from 'react';
import OrganicCanvas from './organicCanvas';
import ChatCanvas from './chatCanvas';
import { ComponentInstance, addComponent, removeComponent, placeComponent, createReply } from '../actions';
import { updateCanvasParameters } from '../services/organicCanvasService';
import { Plus, Trash2, MapPin, MessageSquare, Check } from 'lucide-react';
import '../styles/pages.css';

type PageType = 'organicCanvas' | 'chatCanvas' | null;
type ComponentType = 'testButton' | 'multipleChoice' | null;

interface ChatMessage {
  id: string;
  text?: string;
  type: 'user' | 'response';
  timestamp: Date;
  componentId?: string;
}

const AVAILABLE_COMPONENTS = [
  { type: 'testButton', label: 'Test Button', description: 'A clickable button with link' },
  { type: 'multipleChoice', label: 'Multiple Choice', description: 'A question with 4 options' }
];

const Test: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<PageType>(null);
  const [canvasRows, setCanvasRows] = useState(2);
  const [canvasCols, setCanvasCols] = useState(5);
  const [canvasError, setCanvasError] = useState<string>('');
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [isAddingComponent, setIsAddingComponent] = useState(false);
  const [isPlacingComponent, setIsPlacingComponent] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState<ComponentType>(null);

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
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [placeError, setPlaceError] = useState<string>('');

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

  const handleSelectComponentType = (type: ComponentType) => {
    setSelectedComponentType(type);
  };

  const handleConfirmAdd = () => {
    if (!selectedComponentType) return;

    let metadata: Record<string, any> = {};

    if (selectedComponentType === 'testButton') {
      metadata = { link: buttonLink, buttonTitle };
    } else if (selectedComponentType === 'multipleChoice') {
      metadata = {
        questionNumber,
        question,
        options: [option1, option2, option3, option4] as [string, string, string, string]
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
    if (!selectedComponentId) return;
    const newComponents = removeComponent(components, {
      componentId: selectedComponentId
    });
    setComponents(newComponents);
    setSelectedComponentId('');
  };

  const handleStartPlace = () => {
    if (!selectedComponentId) return;
    setIsPlacingComponent(true);
    setPlaceError('');
    const selectedComponent = components.find(c => c.id === selectedComponentId);
    if (selectedComponent) {
      if (selectedComponent.position.row >= 1 && selectedComponent.position.col >= 1) {
        setPlaceRow(selectedComponent.position.row);
        setPlaceCol(selectedComponent.position.col);
      } else {
        setPlaceRow(1);
        setPlaceCol(1);
      }
    }
  };

  const handleConfirmPlace = () => {
    if (!selectedComponentId) return;

    try {
      const newComponents = placeComponent(components, {
        componentId: selectedComponentId,
        newPosition: { row: placeRow, col: placeCol }
      });
      setComponents(newComponents);
      setIsPlacingComponent(false);
      setPlaceError('');
    } catch (error) {
      setPlaceError((error as Error).message);
    }
  };

  const handleCancelPlace = () => {
    setIsPlacingComponent(false);
    setPlaceError('');
  };

  const handleReplyWithComponent = () => {
    if (!selectedComponentId) return;
    const component = createReply(components, { componentId: selectedComponentId });
    if (component) {
      const replyMessage: ChatMessage = {
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
      return (
        <OrganicCanvas
          rows={canvasRows}
          cols={canvasCols}
          components={components}
        />
      );
    }

    if (selectedPage === 'chatCanvas') {
      return <ChatCanvas components={components} messages={chatMessages} />;
    }

    return (
      <div className="test-welcome">
        <h2>Test Page</h2>
        <p>Select a page to test from the controls above</p>
      </div>
    );
  };

  const renderComponentParameters = () => {
    if (!selectedComponentType) return null;

    switch (selectedComponentType) {
      case 'testButton':
        return (
          <div className="input-group">
            <label>
              Button Title:
              <input
                type="text"
                value={buttonTitle}
                onChange={(e) => setButtonTitle(e.target.value)}
              />
            </label>
            <label>
              Link:
              <input
                type="text"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
              />
            </label>
          </div>
        );
      case 'multipleChoice':
        return (
          <div className="input-group">
            <label>
              Question Number:
              <input
                type="number"
                min="1"
                value={questionNumber}
                onChange={(e) => setQuestionNumber(Number(e.target.value))}
              />
            </label>
            <label>
              Question:
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <label>
              Option 1:
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />
            </label>
            <label>
              Option 2:
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />
            </label>
            <label>
              Option 3:
              <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />
            </label>
            <label>
              Option 4:
              <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="test-container">
      <div className="test-controls">
        <div className="control-section">
          <h3>Page Selection</h3>
          <div className="button-group">
            <button
              className={`control-button ${selectedPage === 'organicCanvas' ? 'active' : ''}`}
              onClick={() => setSelectedPage('organicCanvas')}
            >
              Organic Canvas
            </button>
            <button
              className={`control-button ${selectedPage === 'chatCanvas' ? 'active' : ''}`}
              onClick={() => setSelectedPage('chatCanvas')}
            >
              Chat Canvas
            </button>
          </div>
        </div>

        {(selectedPage === 'organicCanvas' || selectedPage === 'chatCanvas') && (
          <>
            {selectedPage === 'organicCanvas' && (
              <div className="control-section">
                <h3>Canvas Parameters</h3>
                {canvasError && (
                  <div className="error-message">
                    {canvasError}
                  </div>
                )}
                <div className="input-group">
                  <label>
                    Rows:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={canvasRows}
                      onChange={(e) => {
                        const newRows = Number(e.target.value);
                        const result = updateCanvasParameters(newRows, canvasCols, components);
                        if (result.success) {
                          setCanvasRows(newRows);
                          setComponents(result.components);
                          setCanvasError('');
                          if (result.movedComponents.length > 0) {
                            console.log(`${result.movedComponents.length} component(s) moved to unplaced due to canvas resize`);
                          }
                        } else {
                          setCanvasError(result.error || 'Invalid canvas parameters');
                        }
                      }}
                    />
                  </label>
                  <label>
                    Columns:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={canvasCols}
                      onChange={(e) => {
                        const newCols = Number(e.target.value);
                        const result = updateCanvasParameters(canvasRows, newCols, components);
                        if (result.success) {
                          setCanvasCols(newCols);
                          setComponents(result.components);
                          setCanvasError('');
                          if (result.movedComponents.length > 0) {
                            console.log(`${result.movedComponents.length} component(s) moved to unplaced due to canvas resize`);
                          }
                        } else {
                          setCanvasError(result.error || 'Invalid canvas parameters');
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="control-section">
              <h3>Component Actions</h3>
              <div className="action-buttons">
                <button
                  className="action-button add"
                  onClick={handleStartAdd}
                  disabled={isAddingComponent || isPlacingComponent}
                  title="Add Component"
                >
                  <Plus size={18} />
                  Add
                </button>
                <button
                  className="action-button remove"
                  onClick={handleRemoveComponent}
                  disabled={!selectedComponentId || isAddingComponent || isPlacingComponent}
                  title="Remove Component"
                >
                  <Trash2 size={18} />
                  Remove
                </button>
                {selectedPage === 'organicCanvas' && (
                  <button
                    className="action-button place"
                    onClick={handleStartPlace}
                    disabled={!selectedComponentId || isAddingComponent || isPlacingComponent}
                    title="Place Component on Grid"
                  >
                    <MapPin size={18} />
                    Place
                  </button>
                )}
                {selectedPage === 'chatCanvas' && (
                  <button
                    className="action-button reply"
                    onClick={handleReplyWithComponent}
                    disabled={!selectedComponentId || isAddingComponent || isPlacingComponent}
                    title="Reply with Component"
                  >
                    <MessageSquare size={18} />
                    Reply
                  </button>
                )}
              </div>
            </div>

            {components.length > 0 && (
              <div className="control-section">
                <h3>Existing Components</h3>
                <div className="component-list">
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`component-item ${selectedComponentId === component.id ? 'selected' : ''}`}
                      onClick={() => !isAddingComponent && !isPlacingComponent && setSelectedComponentId(component.id)}
                    >
                      <div className="component-info">
                        <strong>{component.type}</strong>
                        <span>
                          {component.position.row === -1 && component.position.col === -1
                            ? 'Position: Unplaced'
                            : `Position: (${component.position.row}, ${component.position.col})`
                          }
                        </span>
                        <span className="component-title">{component.metadata.buttonTitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAddingComponent && (
              <div className="control-section adding-component">
                <h3>Select Component Type</h3>
                <div className="component-type-list">
                  {AVAILABLE_COMPONENTS.map((comp) => (
                    <div
                      key={comp.type}
                      className={`component-type-item ${selectedComponentType === comp.type ? 'selected' : ''}`}
                      onClick={() => handleSelectComponentType(comp.type as ComponentType)}
                    >
                      <div className="component-type-info">
                        <strong>{comp.label}</strong>
                        <span>{comp.description}</span>
                      </div>
                      {selectedComponentType === comp.type && (
                        <Check size={20} className="check-icon" />
                      )}
                    </div>
                  ))}
                </div>

                {selectedComponentType && (
                  <>
                    <div className="control-section">
                      <h3>Component Parameters</h3>
                      {renderComponentParameters()}
                    </div>

                    <div className="add-actions">
                      <button
                        className="confirm-button"
                        onClick={handleConfirmAdd}
                      >
                        <Check size={18} />
                        Confirm Add
                      </button>
                      <button
                        className="cancel-button"
                        onClick={handleCancelAdd}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {isPlacingComponent && selectedPage === 'organicCanvas' && (
              <div className="control-section placing-component">
                <h3>Place Component on Grid</h3>
                {placeError && (
                  <div className="error-message">
                    {placeError}
                  </div>
                )}
                <div className="input-group">
                  <label>
                    Position Row:
                    <input
                      type="number"
                      min="1"
                      max={canvasRows}
                      value={placeRow}
                      onChange={(e) => setPlaceRow(Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Position Column:
                    <input
                      type="number"
                      min="1"
                      max={canvasCols}
                      value={placeCol}
                      onChange={(e) => setPlaceCol(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="add-actions">
                  <button
                    className="confirm-button"
                    onClick={handleConfirmPlace}
                  >
                    <Check size={18} />
                    Confirm Place
                  </button>
                  <button
                    className="cancel-button"
                    onClick={handleCancelPlace}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="test-preview">
        {renderSelectedPage()}
      </div>
    </div>
  );
};

export default Test;
