import { ComponentInstance, Action } from './types';
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
export declare const executeAction: (components: ComponentInstance[], action: Action) => ComponentInstance[];
//# sourceMappingURL=index.d.ts.map