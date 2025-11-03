// src/utils/imageUtils.js


export const getFullImageUrl = (imagePath) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!imagePath) return '/placeholder.png'; // fallback image

  if (imagePath.startsWith('/uploads')) {
    return `${backendUrl}${imagePath}`;
  }


  // Directly use public folder path
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};
