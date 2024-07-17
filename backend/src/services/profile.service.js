import { User } from "../models/User.js";

export const getProfileSevice = async (uid) => {
  const user = await User.findById(uid).lean();
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}