import { User } from "../models/User.js";
import { UnauthorizedError } from "../utils/errors.manager.js";
import { handleHttp } from "../utils/http.manager.js";
import { verifyToken } from "../utils/token.manager.js";

export const requireJwt = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) {
      throw new UnauthorizedError("Acceso no autorizado, No existe el token bearer en el header");
    }
    token = token.split(" ")[1];

    const payload = verifyToken(token);
    if (!payload) {
      throw new UnauthorizedError("Acceso no autorizado, Token inválido");
    }

    const user = await User.findById(payload.uid);
    if (!user) {
      throw new UnauthorizedError("Acceso no autorizado, Usuario no encontrado");
    }

    req.uid = payload.uid;
    next();
  } catch (error) {
    handleHttp(res, error);
  }
}