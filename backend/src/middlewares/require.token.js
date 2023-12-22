import jwt from "jsonwebtoken";

export const requireJwt = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        // console.log(token);

        if (!token) {
            return res.status(401).json({ error: "Acceso no autorizado, No existe el token bearer en el header" });
        }

        token = token.split(" ")[1];

        const payload = jwt.verify(token, process.env.SECRET);
        if (!payload) return res.status(401).json({ error: "Token inválido" });

        // si, si existe y es valido el token en las cookies
        req.uid = payload.uid; // añadir el "user_id" a "req"

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
