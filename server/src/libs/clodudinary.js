import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config()

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

//subir
export const uploadImage = async filePath => {
   return await cloudinary.uploader.upload(filePath, {
      folder: 'group'
   })
}

//eliminar
export const deleteImage = async id => {
   return await cloudinary.uploader.destroy(id)
}
