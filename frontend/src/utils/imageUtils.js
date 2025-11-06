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
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!imagePath) return '/images/default.png';

  // If the image is in the uploads folder on the server
  if (imagePath.startsWith('/uploads')) {
    return `${backendUrl}${imagePath}`; // e.g. https://your-backend.onrender.com/uploads/xxx
  }

  // If the image is an external URL (like Cloudinary, etc)
  return imagePath;
};

