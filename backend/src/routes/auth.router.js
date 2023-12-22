import express from "express";

import { login, logout, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validator.manager.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/logout", logout);

export default router;