import { User } from "../models/User.js";
import { Image } from "../models/Image.js";
import { deleteImages } from "./cloudinary.service.js";
import { NotFoundError } from '../utils/errors.manager.js';

export const getProfileSevice = async (uid) => {
  const user = await User.findById(uid).lean();
  if (!user) throw new NotFoundError("Usuario no encontrado");
  return user;
}

export const deleteProfileService = async (uid) => {
  const user = await User.findById(uid);
  if (!user) throw new NotFoundError("Usuario no encontrado");

  const images = await Image.find({ uid }).lean();
  await deleteImages(images);
  await Image.deleteMany({ uid });

  await user.deleteOne();
  return user;
}