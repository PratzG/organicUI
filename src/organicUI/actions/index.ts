import { ComponentInstance, Action, AddActionPayload, RemoveActionPayload, PlaceActionPayload } from './types';
import { addComponent } from './add';
import { removeComponent } from './remove';
import { placeComponent } from './place';
import { createReply } from './reply';

// Export all types and action functions for external use
export * from './types';
export { addComponent } from './add';
export { removeComponent } from './remove';
export { placeComponent } from './place';
export { createReply } from './reply';

/**
 * Central action executor that processes component actions
 *
 * @param components - Current array of component instances
 * @param action - Action object with type and payload
 * @returns New array with the action applied
 *
 * This function serves as a dispatcher for all component actions.
 * It's particularly useful for LLM integration where actions can be
 * generated dynamically and executed in sequence.
 *
 * Supported action types:
 * - 'add': Creates a new component
 * - 'remove': Deletes a component by ID
 * - 'place': Updates a component's position on OrganicCanvas
 * - 'reply': Retrieves component for rendering in chat (doesn't modify components)
 */
export const executeAction = (
  components: ComponentInstance[],
  action: Action
): ComponentInstance[] => {
  // Route the action to the appropriate handler based on action type
  switch (action.type) {
    case 'add':
      return addComponent(components, action.payload as AddActionPayload);
    case 'remove':
      return removeComponent(components, action.payload as RemoveActionPayload);
    case 'place':
      return placeComponent(components, action.payload as PlaceActionPayload);
    case 'reply':
      // Reply action doesn't modify components array, just returns it as-is
      // Use createReply separately to get component data for chat rendering
      return components;
    default:
      // Return unchanged components for unknown action types
      return components;
  }
};
