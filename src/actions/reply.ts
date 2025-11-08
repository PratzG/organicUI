import { ComponentInstance, ReplyActionPayload } from './types.js';

/**
 * Creates a reply action payload for rendering a component in chat
 *
 * @param components - Current array of component instances
 * @param payload - Contains componentId to render as a chat reply
 * @returns Reply action payload with component details
 *
 * Note: This action doesn't modify the components array. It's used to
 * retrieve component data for rendering in the chat messages array.
 * Components can be rendered multiple times in chat (once per reply action).
 */
export const createReply = (
  components: ComponentInstance[],
  payload: ReplyActionPayload
): ComponentInstance | null => {
  // Find the component by ID
  const component = components.find(c => c.id === payload.componentId);

  if (!component) {
    return null;
  }

  // Return the component data for rendering in chat
  return component;
};
