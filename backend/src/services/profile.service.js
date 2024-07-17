import { User } from "../models/User.js";
import { NotFoundError } from '../utils/errors.manager.js';

export const getProfileSevice = async (uid) => {
  const user = await User.findById(uid).lean();
  if (!user) throw new NotFoundError("Usuario no encontrado");
  return user;
}