export const getFullImageUrl = (imagePath) => {
  const backendUrl = 'http://localhost:5000';

  if (!imagePath) return '/images/default.png';

  if (imagePath.startsWith('/uploads')) {
    return `${backendUrl}${imagePath}`;
  }

  return imagePath;
};
