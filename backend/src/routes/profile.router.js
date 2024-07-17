import express from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { requireJwt } from "../middlewares/token.middleware.js";

const router = express.Router();

router.get("/", requireJwt, getProfile);

export default router;