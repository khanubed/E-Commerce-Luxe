import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// // console.log("Cloudinary Configured: ", cloudinary.config());

process.env.CLOUDINARY_KEY;
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder based on file type
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: isVideo ? "store/videos" : "store/products",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo
        ? ["mp4", "mkv"]
        : ["jpg", "png", "webp", "jpeg"],
      transformation: isVideo
        ? []
        : [{ width: 1000, height: 1000, crop: "limit" }], // Resize images
    };
  },
});

// 3. File Filter (Additional security check)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images and videos are allowed!"),
      false,
    );
  }
};

// 4. Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
export default upload;
