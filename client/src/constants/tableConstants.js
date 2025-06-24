/**
 * Constants for table field ordering and configuration
 * Used across admin table components to ensure consistent display
 */

/**
 * Preferred order for table fields
 * This determines the display order of columns in admin tables
 */
export const PREFERRED_FIELD_ORDER = [
  "title",
  "name",
  "question",
  "answer",
  "content",
  "pictures",
  "picture",
  "pictureDescription",
  "type",
  "serviceType",
  "tag",
  "placeType",
  "tags",
  "phone",
  "email",
  "username",
  "link",
  "website",
  "pinned",
  "showInSlider",
  "slidePriority",
  "sources",
  "approved",
  "priority",
  "price",
  "dayOfWeek",
  "isActive",
  "lastDayToRegister",
  "repeatAt",
  "tripDate",
  "createdAt",
  "updatedAt",
];

/**
 * Fields to ignore in table display
 * These fields will not be shown in admin tables
 */
export const IGNORED_FIELDS = ["_id", "subData", "__v", "password"];
