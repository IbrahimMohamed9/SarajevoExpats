/**
 * Generates a URL for viewing an item based on its type and ID
 * @param {Object} itemData - The item data containing _id and type information
 * @param {String} tableKey - The table key that indicates the type of content
 * @returns {String} - The URL path for viewing the item
 */
export const getItemViewUrl = (itemData, tableKey) => {
  if (!itemData || !itemData._id) return "/";

  // Extract the base table type from tableKey (remove any path segments)
  const type = tableKey?.split("/")?.[0]?.toLowerCase();

  switch (type) {
    case "services":
      return `/services/${itemData.serviceType?.replace("/", "%2F")}/${
        itemData._id
      }`;
    case "places":
      return `/places/${itemData.type?.replace("/", "%2F")}/${itemData._id}`;
    case "news":
      return `/news/${itemData._id}`;
    case "events":
      return `/events/${itemData._id}`;
    default:
      return "/";
  }
};

/**
 * Determines if a view button should be shown for a particular table
 * @param {String} tableKey - The table key to check
 * @returns {Boolean} - Whether the view button should be shown
 */
export const shouldShowViewButton = (tableKey) => {
  // Don't show for placeTypes, placeTags, or any table with 'type' or 'tag' in the name
  return !(
    tableKey?.includes("Type") ||
    tableKey?.includes("type") ||
    tableKey?.includes("Tag") ||
    tableKey?.includes("tag") ||
    tableKey?.includes("users") ||
    tableKey?.includes("qaas")
  );
};
