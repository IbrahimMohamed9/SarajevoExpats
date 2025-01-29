const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatObjectDates = (obj) => {
  if (!obj) return obj;
  const formattedObj = obj.toObject ? obj.toObject() : { ...obj };

  if (formattedObj.date) formattedObj.date = formatDate(formattedObj.date);

  if (formattedObj.createdAt)
    formattedObj.createdAt = formatDate(formattedObj.createdAt);

  if (formattedObj.updatedAt)
    formattedObj.updatedAt = formatDate(formattedObj.updatedAt);

  return formattedObj;
};

const formatArrayDates = (array) => {
  if (!Array.isArray(array)) return [];
  return array.map((item) => formatObjectDates(item));
};

module.exports = {
  formatDate,
  formatObjectDates,
  formatArrayDates,
};
