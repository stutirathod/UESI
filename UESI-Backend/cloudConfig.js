const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Ensure environment variables are set correctly
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.error("❌ Cloudinary environment variables are missing!");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "UESI_DEV",
      allowed_formats: ["png", "jpg", "jpeg", "mp4"],
      resource_type: isVideo ? "video" : "image",
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};