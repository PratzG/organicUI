import { ComponentInstance } from '../actions';
export interface GridCellInfo {
    row: number;
    col: number;
    isEmpty: boolean;
    component?: {
        id: string;
        type: string;
        name: string;
    };
}
export interface CanvasParameters {
    rows: number;
    cols: number;
}
export interface CanvasInfo {
    parameters: CanvasParameters;
    totalCells: number;
    occupiedCells: number;
    emptyCells: number;
    grid: GridCellInfo[][];
}
/**
 * Get detailed information about the organic canvas
 */
export declare const getCanvasInfo: (rows: number, cols: number, components: ComponentInstance[]) => CanvasInfo;
/**
 * Get information about a specific grid cell
 */
export declare const getCellInfo: (row: number, col: number, components: ComponentInstance[]) => GridCellInfo;
/**
 * Get all empty cells in the canvas
 */
export declare const getEmptyCells: (rows: number, cols: number, components: ComponentInstance[]) => GridCellInfo[];
/**
 * Get all occupied cells in the canvas
 */
export declare const getOccupiedCells: (rows: number, cols: number, components: ComponentInstance[]) => GridCellInfo[];
/**
 * Validate if canvas parameters are valid
 */
export declare const validateCanvasParameters: (rows: number, cols: number) => {
    isValid: boolean;
    error?: string;
};
/**
 * Update canvas parameters and handle component repositioning if needed
 * Returns updated components array with components outside new bounds removed from grid
 */
export declare const updateCanvasParameters: (newRows: number, newCols: number, components: ComponentInstance[]) => {
    success: boolean;
    error?: string;
    components: ComponentInstance[];
    movedComponents: ComponentInstance[];
};
//# sourceMappingURL=organicCanvasService.d.ts.map