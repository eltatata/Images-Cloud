import { registerService, loginService, verifyService } from "../services/auth.service.js";
import { handleHttp } from "../utils/http.manager.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const user = await registerService(data);
    res.status(201).json({ user });
  } catch (error) {
    handleHttp(res, error);
  }
}

export const login = async (req, res) => {
  try {
    const data = req.body;
    const { token, user } = await loginService(data);
    res.status(200).json({ token, user });
  } catch (error) {
    handleHttp(res, error);
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.params.token;
    await verifyService(token);
    res.redirect(`${process.env.ORIGIN1}/auth/login?reason=verified`);
  } catch (error) {
    handleHttp(res, error);
  }
}