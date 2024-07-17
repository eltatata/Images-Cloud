import { Image } from "../models/Image.js";
import { v2 as cloudinary } from 'cloudinary';
import { NotFoundError } from '../utils/errors.manager.js';

export const getImagesService = async (uid) => {
  const images = await Image.find({ uid }).lean();
  return images;
}

export const getImageService = async (id) => {
  const image = await Image.findById(id).lean();
  if (!image) throw new NotFoundError('Imagen no encontrada');
  return image;
}

export const uploadImageService = async (data) => {
  const buffer = data.image.buffer;

  const cloudinaryResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: process.env.CLOUNDINARY_FOLDER }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    }).end(buffer);
  });

  const image = new Image({
    name: data.name,
    description: data.description,
    width: cloudinaryResponse.width,
    height: cloudinaryResponse.height,
    url: cloudinaryResponse.secure_url,
    public_id: cloudinaryResponse.public_id,
    uid: data.uid
  })
  await image.save();

  return image;
}

export const deleteImageService = async (id) => {
  const image = await Image.findByIdAndDelete(id);
  if (!image) throw new NotFoundError('Imagen no encontrada');

  const { public_id } = image;
  await cloudinary.uploader.destroy(public_id, (error, result) => {
    if (result.result !== "ok") throw new Error('Error al eliminar la imagen en Cloudinary');
  });

  return image;
}