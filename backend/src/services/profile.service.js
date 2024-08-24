import { User } from "../models/User.js";
import { Image } from "../models/Image.js";
import { cloudinaryDeleteFolder } from "./cloudinary.service.js";
import { NotFoundError } from '../utils/errors.manager.js';

export const getProfileSevice = async (uid) => {
  const user = await User.findById(uid).lean();
  if (!user) throw new NotFoundError("Usuario no encontrado");
  return user;
}

export const updateProfileService = async (uid, data) => {
  const user = await User.findById(uid);
  if (!user) throw new NotFoundError("Usuario no encontrado");

  const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });
  return updatedUser;
}

export const deleteProfileService = async (uid) => {
  const user = await User.findById(uid);
  if (!user) throw new NotFoundError("Usuario no encontrado");

  await cloudinaryDeleteFolder(uid);
  await Image.deleteMany({ uid });

  await user.deleteOne();
  return user;
}