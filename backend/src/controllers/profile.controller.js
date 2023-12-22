import { User } from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const uid = req.uid

        const user = await User.findById(uid).lean();

        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}