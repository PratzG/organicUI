/**
 * Position on a canvas grid
 *
 * Position conventions:
 * - Position data ONLY affects placement on OrganicCanvas (grid positioning)
 * - ChatCanvas uses reply actions - components render as part of chat messages
 * - row >= 1, col >= 1 = Placed on OrganicCanvas at specific grid cell
 * - row: -1, col: -1 = Unplaced (not visible on OrganicCanvas)
 */
export interface Position {
    row: number;
    col: number;
}
/**
 * A component instance representing a UI element on a canvas
 *
 * All components have:
 * - Unique ID for identification
 * - Type that determines which React component to render
 * - Position that determines where it appears
 * - Metadata containing component-specific data (e.g., button text, links)
 */
export interface ComponentInstance {
    id: string;
    type: string;
    position: Position;
    metadata: Record<string, any>;
}
/**
 * Available action types for component manipulation
 */
export type ActionType = 'add' | 'remove' | 'place' | 'reply';
/**
 * Generic action structure
 * Used by executeAction to process component operations
 */
export interface Action {
    type: ActionType;
    payload: any;
}
/**
 * Payload for adding a new component
 * Contains the component type and its initial metadata
 */
export interface AddActionPayload {
    componentType: string;
    metadata: Record<string, any>;
}
/**
 * Payload for removing a component
 * Contains only the component ID to remove
 */
export interface RemoveActionPayload {
    componentId: string;
}
/**
 * Payload for placing/moving a component on OrganicCanvas
 * Contains the component ID and the target position
 */
export interface PlaceActionPayload {
    componentId: string;
    newPosition: Position;
}
/**
 * Payload for replying with a component in chat
 * Contains only the component ID to render as a chat message
 */
export interface ReplyActionPayload {
    componentId: string;
}
//# sourceMappingURL=types.d.ts.map