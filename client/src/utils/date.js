import { parse } from "date-fns";

export default function parseFormattedDate(dateString) {
  return parse(dateString, "MMMM d, yyyy 'at' hh:mm a", new Date());
}

export function getValidDateOrNow(date) {
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}
