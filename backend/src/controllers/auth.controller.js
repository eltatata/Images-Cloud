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
    res.send(` 
      <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
          <h1 style="color: #333;">Images Cloud</h1>
          <p style="color: #666;">Tu email ha sido verificado. Puedes cerrar esta ventana.</p>
        </div>
      </div>
    `);
  } catch (error) {
    handleHttp(res, error);
  }
}