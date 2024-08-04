import express from "express";
import { login, register, verify } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../utils/validator.manager.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/verify/:token", verify);

export default router;