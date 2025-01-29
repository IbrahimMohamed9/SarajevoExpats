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
  const formattedObj = obj.toObject ? obj.toObject() : { ...obj };
  if (formattedObj.date) formattedObj.date = formatDate(formattedObj.date);

  if (formattedObj.createdAt)
    formattedObj.createdAt = formatDate(formattedObj.createdAt);

  if (formattedObj.updatedAt)
    formattedObj.updatedAt = formatDate(formattedObj.updatedAt);

  return formattedObj;
};

const formatArrayDates = (array) => {
  return array.map((item) => formatObjectDates(item));
};

module.exports = {
  formatDate,
  formatObjectDates,
  formatArrayDates,
};
