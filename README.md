# Organic Canvas UI

A React component library for building dynamic, grid-based canvases and chat interfaces with interactive components.

## Installation

Install directly from Git:

```bash
npm install git+https://github.com/PratzG/organicUI.git
```

Or using a specific branch:

```bash
npm install git+https://github.com/PratzG/organicUI.git#main
```

## Features

- **OrganicCanvas**: Grid-based component placement system
- **ChatCanvas**: Chat interface for component rendering
- **Interactive Components**: TestButton, MultipleChoice, and extensible component system
- **Canvas Management**: Service layer for grid state management
- **Action System**: Add, remove, place, and reply actions for component manipulation
- **TypeScript Support**: Full type definitions included

## Usage

### Basic Setup

```tsx
import {
  OrganicCanvas,
  ChatCanvas,
  TestButton,
  MultipleChoice,
  ComponentInstance
} from 'organicui';
import 'organicui/styles';

function App() {
  const [components, setComponents] = useState<ComponentInstance[]>([]);

  return (
    <div>
      <OrganicCanvas
        rows={3}
        cols={5}
        components={components}
      />
    </div>
  );
}
```

### Using Actions

```tsx
import { addComponent, placeComponent, removeComponent } from 'organicui';

// Add a new test button
const newComponents = addComponent(components, {
  componentType: 'testButton',
  metadata: {
    link: 'https://example.com',
    buttonTitle: 'Click Me'
  }
});

// Place it on the grid
const placedComponents = placeComponent(newComponents, {
  componentId: 'component-id',
  newPosition: { row: 1, col: 1 }
});

// Remove a component
const updatedComponents = removeComponent(components, {
  componentId: 'component-id'
});
```

### Canvas Management

```tsx
import {
  getCanvasInfo,
  updateCanvasParameters,
  getEmptyCells,
  getOccupiedCells
} from 'organicui';

// Get detailed canvas information
const canvasInfo = getCanvasInfo(rows, cols, components);
console.log(canvasInfo.occupiedCells, canvasInfo.emptyCells);

// Update canvas size with validation
const result = updateCanvasParameters(5, 10, components);
if (result.success) {
  setComponents(result.components);
}

// Query cells
const emptyCells = getEmptyCells(rows, cols, components);
const occupiedCells = getOccupiedCells(rows, cols, components);
```

### Chat Interface

```tsx
import { ChatCanvas } from 'organicui';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [components, setComponents] = useState([]);

  return (
    <ChatCanvas
      messages={messages}
      components={components}
    />
  );
}
```

## Component Types

### TestButton

A clickable button component with customizable link and title.

```tsx
{
  type: 'testButton',
  metadata: {
    link: string,
    buttonTitle: string
  }
}
```

### MultipleChoice

A multiple choice question with 4 options and a submit button.

```tsx
{
  type: 'multipleChoice',
  metadata: {
    questionNumber: number,
    question: string,
    options: [string, string, string, string]
  }
}
```

## API Reference

### Components

- `OrganicCanvas`: Grid-based component placement
- `ChatCanvas`: Chat interface rendering
- `TestButton`: Interactive button component
- `MultipleChoice`: Question component with 4 options

### Actions

- `addComponent(components, payload)`: Add new component
- `removeComponent(components, payload)`: Remove component by ID
- `placeComponent(components, payload)`: Update component position

### Services

- `getCanvasInfo(rows, cols, components)`: Get canvas state details
- `updateCanvasParameters(rows, cols, components)`: Update canvas size
- `getEmptyCells(rows, cols, components)`: Get all empty cells
- `getOccupiedCells(rows, cols, components)`: Get all occupied cells
- `getCellInfo(row, col, components)`: Get specific cell information
- `validateCanvasParameters(rows, cols)`: Validate canvas dimensions

## TypeScript

Full TypeScript definitions are included. Import types as needed:

```tsx
import type {
  ComponentInstance,
  Position,
  TestButtonMetadata,
  MultipleChoiceMetadata,
  CanvasInfo,
  GridCellInfo
} from 'organicui';
```

## License

MIT
