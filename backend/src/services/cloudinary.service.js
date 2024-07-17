import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (buffer) => {
  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: process.env.CLOUNDINARY_FOLDER }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    }).end(buffer);
  });

  return response;
}

export const cloudinaryDelete = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, (error, result) => {
    if (result.result !== "ok") throw new Error('Error al eliminar la imagen en Cloudinary');
  });
}

export const cloudinaryDeleteImages = async (images) => {
  for (const image of images) {
    await cloudinaryDelete(image.public_id);
  }
}