const imageLoader = ({ src, width, quality = 75 }) => {
  if (src.includes("images.pexels.com")) {
    return `${src}?auto=compress&w=${width}&q=${quality}`;
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}&q=${quality}`;
};

export default imageLoader;
