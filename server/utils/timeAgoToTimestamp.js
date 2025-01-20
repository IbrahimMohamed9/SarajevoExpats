async function timeAgoToTimestamp(timeAgo) {
  const now = new Date();
  const units = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  if (timeAgo === "just now") {
    return now.toISOString();
  }

  const match = timeAgo.match(/(\d+)\s*([smhdw])/);
  if (!match) {
    return now.toISOString();
  }

  const [_, amount, unit] = match;
  const milliseconds = units[unit] * parseInt(amount);
  const timestamp = new Date(now.getTime() - milliseconds);
  return timestamp.toISOString();
}

module.exports = timeAgoToTimestamp;
