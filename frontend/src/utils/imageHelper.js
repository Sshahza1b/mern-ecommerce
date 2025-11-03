export const getFullImageUrl = (imagePath) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!imagePath) return '/images/default.png';

  if (imagePath.startsWith('/uploads')) {
    return `${backendUrl}${imagePath}`;
  }

  return imagePath;
};
