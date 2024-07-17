import { verifyToken } from "../utils/token.manager.js";

export const requireJwt = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) {
      return res.status(401).json({ error: "Acceso no autorizado, No existe el token bearer en el header" });
    }
    token = token.split(" ")[1];

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: "Acceso no autorizado, Token inválido" });
    }

    req.uid = payload.uid;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}