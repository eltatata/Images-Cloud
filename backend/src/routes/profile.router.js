import express from "express";
import { deleteProfile, getProfile, updateProfile } from "../controllers/profile.controller.js";
import { requireJwt } from "../middlewares/token.middleware.js";

const router = express.Router();

router.get("/", requireJwt, getProfile);
router.put("/:id", requireJwt, updateProfile);
router.delete("/", requireJwt, deleteProfile);

export default router;