import { Image } from "../models/Image.js";
import { cloudinaryUpload, cloudinaryDelete } from "./cloudinary.service.js";
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors.manager.js';

export const getImagesService = async (uid) => {
  const images = await Image.find({ uid }).lean();
  return images;
}

export const getImageService = async (id, uid) => {
  const image = await Image.findById(id).lean();
  if (!image) throw new NotFoundError('Imagen no encontrada');
  if (!image.uid.equals(uid)) throw new ForbiddenError('No tienes permisos para ver esta imagen');
  return image;
}

export const uploadImageService = async (data) => {
  if (!data.name) throw new BadRequestError('El nombre de la imagen es requerido');

  const buffer = data.image.buffer;
  const cloudinaryResponse = await cloudinaryUpload(buffer, data.uid);

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

export const deleteImageService = async (id, uid) => {
  const image = await Image.findById(id);

  if (!image) throw new NotFoundError('Imagen no encontrada');
  if (!image.uid.equals(uid)) throw new ForbiddenError('No tienes permisos para borrar esta imagen');

  await Image.deleteOne();

  const { public_id } = image;
  await cloudinaryDelete(public_id);

  return image;
}