import crypto from "crypto"
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from "../utils/password.manager.js";
import { generateToken } from '../utils/token.manager.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors.manager.js';
import { sendVerificationEmail } from "./email.service.js";

export const registerService = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) throw new BadRequestError('El usuario ya existe');

  user = new User({
    name: data.name,
    username: data.username,
    email: data.email,
    password: await hashPassword(data.password),
    token: crypto.randomBytes(16).toString('hex'),
  });
  await user.save();

  await sendVerificationEmail(user.email, user.token);

  return user;
}

export const loginService = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new NotFoundError('Usuario no encontrado');
  if (!await comparePassword(data.password, user.password)) throw new BadRequestError('Contraseña incorrecta');
  if (!user.confirmed) throw new ForbiddenError('Usuario no verificado, revise su correo electrónico');

  const token = generateToken({ uid: user._id, email: user.email });

  return { token, user };
}

export const verifyService = async (token) => {
  const user = await User.findOne({ token });
  if (!user) throw new BadRequestError('Link de verificación inválido');

  user.confirmed = true;
  user.token = undefined;
  await user.save();

  return user;
}