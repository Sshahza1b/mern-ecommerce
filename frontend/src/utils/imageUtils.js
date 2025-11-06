// utils/imageUtils.js
export const getFullImageUrl = (imagePath) => {
    // Agar path already "/" se start ho raha hai, direct return kar do
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
}
