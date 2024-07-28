import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (buffer, uid) => {
  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: `${process.env.CLOUNDINARY_FOLDER}/${uid}` }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    }).end(buffer);
  });

  return response;
}

export const cloudinaryDelete = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error || result.result !== "ok") {
        reject(new Error('Error al eliminar la imagen en Cloudinary'));
      } else {
        resolve(result);
      }
    });
  });
}

export const cloudinaryDeleteImages = async (images) => {
  for (const image of images) {
    await cloudinaryDelete(image.public_id);
  }
}