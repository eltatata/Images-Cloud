import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const user = await registerService(data);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const data = req.body;
    const { token, user } = await loginService(data);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}