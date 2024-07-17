import { body, param } from "express-validator";
import { middlewareValidationResult } from "../middlewares/validator.middleware.js";

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