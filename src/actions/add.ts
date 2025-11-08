import { ComponentInstance, AddActionPayload } from './types.js';

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
export const addComponent = (
  components: ComponentInstance[],
  payload: AddActionPayload
): ComponentInstance[] => {
  // Generate a unique ID using component type, timestamp, and random string
  const newComponent: ComponentInstance = {
    id: `${payload.componentType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: payload.componentType,
    position: { row: -1, col: -1 }, // Unplaced position
    metadata: payload.metadata
  };

  // Return new array with the added component (immutable update)
  return [...components, newComponent];
};
