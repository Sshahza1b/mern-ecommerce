export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png'; // fallback image

  // If imagePath already looks like a full URL (http or https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Otherwise, prefix with your backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  return `${backendUrl}${imagePath}`;
};
