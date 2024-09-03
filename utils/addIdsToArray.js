/**
 * Adds incremental IDs to an array of objects.
 * @param {Array<Object>} items - The array of objects to which IDs will be added.
 * @returns {Array<Object>} - The array of objects with incremental IDs attached.
 */
const addIdsToArray = (items) => {
  return items.map((item, index) => ({
    id: index + 1, // Incremental ID starting from 1
    ...item, // Spread existing properties of the item
  }))
}

export default addIdsToArray
