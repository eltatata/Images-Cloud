import { validationResult, body, param } from "express-validator";

export const middlewareValidationResult = (req, res, next) => {
    // capturar los errores del req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
};

export const registerValidator = [
    body("username", "Username invalido").trim().notEmpty().escape(),
    body("email", "Email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña invalida").trim(),
    middlewareValidationResult
];

export const loginValidator = [
    body("email", "Email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña invalida").trim(),
    middlewareValidationResult
]; 

export const paramIdValidator = [
    param("id", "Formato de id incorrecto").trim().notEmpty().escape(),
    middlewareValidationResult
]