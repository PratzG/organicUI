import { ComponentInstance, AddActionPayload } from './types';
/**
 * Adds a new component to the components array
 *
 * @param components - Current array of component instances
 * @param payload - Contains componentType and metadata for the new component
 * @returns New array with the added component
 *
 * Note: New components are created with position (-1, -1) indicating they are
 * not yet placed on any canvas. Use placeComponent to assign a valid position.
 */
export declare const addComponent: (components: ComponentInstance[], payload: AddActionPayload) => ComponentInstance[];
//# sourceMappingURL=add.d.ts.map