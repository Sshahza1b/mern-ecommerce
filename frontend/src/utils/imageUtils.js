// // // utils/imageUtils.js

// export const getFullImageUrl = (imagePath) => {
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   // If no image, return default placeholder
//   if (!imagePath) return '/images/default.png';

//   // If image comes from backend uploads folder
//   if (imagePath.startsWith('/uploads')) {
//     return `${backendUrl}${imagePath}`; // append backend URL for live
//   }

//   // If image is already a full URL or begins with "/"
//   if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
//     return imagePath;
//   }

//   // For other paths, make sure there's a leading slash
//   return `/${imagePath}`;
// };

// utils/imageUtils.js
export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return ''; // handle empty image

  // If already an absolute URL (e.g. https://)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // For dev mode (localhost), prepend backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  return `${backendUrl}${imagePath}`;
};

