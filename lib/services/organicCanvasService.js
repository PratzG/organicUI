/**
 * Get the display name for a component based on its type and metadata
 */
const getComponentName = (component) => {
    switch (component.type) {
        case 'testButton':
            return component.metadata.buttonTitle || 'Test Button';
        case 'multipleChoice':
            return `Question ${component.metadata.questionNumber}`;
        default:
            return component.type;
    }
};
/**
 * Get detailed information about the organic canvas
 */
export const getCanvasInfo = (rows, cols, components) => {
    const grid = [];
    // Initialize grid with empty cells
    for (let row = 1; row <= rows; row++) {
        const rowCells = [];
        for (let col = 1; col <= cols; col++) {
            rowCells.push({
                row,
                col,
                isEmpty: true
            });
        }
        grid.push(rowCells);
    }
    // Fill in components
    const placedComponents = components.filter(c => c.position.row >= 1 && c.position.col >= 1);
    placedComponents.forEach(component => {
        const { row, col } = component.position;
        if (row >= 1 && row <= rows && col >= 1 && col <= cols) {
            grid[row - 1][col - 1] = {
                row,
                col,
                isEmpty: false,
                component: {
                    id: component.id,
                    type: component.type,
                    name: getComponentName(component)
                }
            };
        }
    });
    const totalCells = rows * cols;
    const occupiedCells = placedComponents.filter(c => c.position.row <= rows && c.position.col <= cols).length;
    const emptyCells = totalCells - occupiedCells;
    return {
        parameters: { rows, cols },
        totalCells,
        occupiedCells,
        emptyCells,
        grid
    };
};
/**
 * Get information about a specific grid cell
 */
export const getCellInfo = (row, col, components) => {
    const component = components.find(c => c.position.row === row && c.position.col === col);
    if (component) {
        return {
            row,
            col,
            isEmpty: false,
            component: {
                id: component.id,
                type: component.type,
                name: getComponentName(component)
            }
        };
    }
    return {
        row,
        col,
        isEmpty: true
    };
};
/**
 * Get all empty cells in the canvas
 */
export const getEmptyCells = (rows, cols, components) => {
    const emptyCells = [];
    const canvasInfo = getCanvasInfo(rows, cols, components);
    canvasInfo.grid.forEach(row => {
        row.forEach(cell => {
            if (cell.isEmpty) {
                emptyCells.push(cell);
            }
        });
    });
    return emptyCells;
};
/**
 * Get all occupied cells in the canvas
 */
export const getOccupiedCells = (rows, cols, components) => {
    const occupiedCells = [];
    const canvasInfo = getCanvasInfo(rows, cols, components);
    canvasInfo.grid.forEach(row => {
        row.forEach(cell => {
            if (!cell.isEmpty) {
                occupiedCells.push(cell);
            }
        });
    });
    return occupiedCells;
};
/**
 * Validate if canvas parameters are valid
 */
export const validateCanvasParameters = (rows, cols) => {
    if (rows < 1 || rows > 10) {
        return {
            isValid: false,
            error: 'Rows must be between 1 and 10'
        };
    }
    if (cols < 1 || cols > 10) {
        return {
            isValid: false,
            error: 'Columns must be between 1 and 10'
        };
    }
    return { isValid: true };
};
/**
 * Update canvas parameters and handle component repositioning if needed
 * Returns updated components array with components outside new bounds removed from grid
 */
export const updateCanvasParameters = (newRows, newCols, components) => {
    const validation = validateCanvasParameters(newRows, newCols);
    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error,
            components,
            movedComponents: []
        };
    }
    const movedComponents = [];
    const updatedComponents = components.map(component => {
        if (component.position.row > newRows ||
            component.position.col > newCols) {
            if (component.position.row >= 1 && component.position.col >= 1) {
                movedComponents.push(component);
            }
            return {
                ...component,
                position: { row: -1, col: -1 }
            };
        }
        return component;
    });
    return {
        success: true,
        components: updatedComponents,
        movedComponents
    };
};
