/**
 * Removes a component from the components array by its ID
 *
 * @param components - Current array of component instances
 * @param payload - Contains the componentId to remove
 * @returns New array without the removed component
 *
 * Note: This operation is immutable and returns a new array.
 * If the component ID doesn't exist, the original array is returned unchanged.
 */
export const removeComponent = (components, payload) => {
    // Filter out the component with the matching ID
    return components.filter(component => component.id !== payload.componentId);
};
