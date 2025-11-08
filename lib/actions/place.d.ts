import { ComponentInstance, PlaceActionPayload } from './types';
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
export declare const placeComponent: (components: ComponentInstance[], payload: PlaceActionPayload) => ComponentInstance[];
//# sourceMappingURL=place.d.ts.map