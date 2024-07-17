import jwt from "jsonwebtoken";
import { User } from '../models/User.js';

export const registerService = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) throw new Error('El usuario ya existe');

  user = new User(data);
  await user.save();

  return user;
}

export const loginService = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error('Usuario no encontrado');
  if (!user.comparePassword(data.password)) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    uid: user._id,
    email: user.email
  }, process.env.SECRET)

  return { token, user };
}