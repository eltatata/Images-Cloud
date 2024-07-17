import express from "express";
import { deleteProfile, getProfile } from "../controllers/profile.controller.js";
import { requireJwt } from "../middlewares/token.middleware.js";

const router = express.Router();

router.get("/", requireJwt, getProfile);
router.delete("/", requireJwt, deleteProfile);

export default router;