export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png'; // fallback image

  // If imagePath already looks like a full URL (http or https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Otherwise, use your backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Ensure that imagePath starts with a slash
  const formattedImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${backendUrl}${formattedImagePath}`;
};
