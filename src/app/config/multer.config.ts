import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
});

// // Define upload directory
// const uploadDir = join(__dirname, 'uploads');

// // Ensure the uploads directory exists
// if (!existsSync(uploadDir)) {
//   mkdirSync(uploadDir, { recursive: true }); // Added recursive option
// }

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'uploads',  // Specify the folder in Cloudinary
      format: file.mimetype.split('/')[1], // Use the file's original extension
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}` // Generate a unique filename
    };
  },
});


 // Added recursive option
// // Set up storage for uploaded files
// const storage: StorageEngine = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//     cb(null, uploadDir);
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     const fileExtension = file.originalname.split('.').pop(); // Extract file extension
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique file name
//     cb(null, `${uniqueName}.${fileExtension}`);
//   }
// });

// Create the multer instance
const upload = multer({ storage });

export default upload;
