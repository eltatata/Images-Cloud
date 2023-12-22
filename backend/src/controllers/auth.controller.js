import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
    try {
        const data = req.body;

        let user = await User.findOne({ email: data.email })
        if (user) return res.status(409).json({ error: "El usuario ya existe" });

        user = new User(data);
        await user.save();

        console.log("Usuario registrado");
        res.status(201).json({ registered: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        if (!user.comparePassword(data.password)) return res.status(401).json({ error: "Contraseña incorrecta" });

        // crear JWT para administrar la sesiones
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // Expira en 30 días
            uid: user._id,
            email: user.email
        }, process.env.SECRET)

        console.log("Sesion iniciada");

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const logout = (req, res) => {
    if (!req.cookies.tokenSesionApp) {
        return res.status(404).json({ error: "No se encontro una sesion activa" });
    }

    res.clearCookie("tokenSesionApp")
    console.log("Sesion cerrada");
    res.status(200).json({ logout: "Sesión cerrada" });
}