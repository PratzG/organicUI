/**
 * Places or moves a component to a new position on the OrganicCanvas
 *
 * @param components - Current array of component instances
 * @param payload - Contains componentId and the new position (row, col)
 * @returns New array with the component's updated position
 * @throws Error if the target position is already occupied by another component
 *
 * Position conventions:
 * - row >= 1, col >= 1 = Placed on OrganicCanvas at specific grid cell
 * - row: -1, col: -1 = Unplaced (not visible on OrganicCanvas)
 *
 * Note: Position data only affects OrganicCanvas. ChatCanvas visibility should
 * be controlled by a separate mechanism (e.g., metadata flag).
 */
export const placeComponent = (components, payload) => {
    // Check if another component already occupies the target position
    // We exclude the component being moved from this check
    const isPositionOccupied = components.some(component => component.id !== payload.componentId &&
        component.position.row === payload.newPosition.row &&
        component.position.col === payload.newPosition.col);
    // Prevent placing components on top of each other
    if (isPositionOccupied) {
        throw new Error('Position is already occupied by another component');
    }
    // Update the position of the target component (immutable update)
    return components.map(component => {
        if (component.id === payload.componentId) {
            return {
                ...component,
                position: payload.newPosition
            };
        }
        return component;
    });
};
