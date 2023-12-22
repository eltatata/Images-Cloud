import express from "express";

import { deleteImage, getImage, getUserImages, uploadImage } from "../controllers/images.controller.js";
import { requireJwt } from "../middlewares/require.token.js";
import { paramIdValidator } from "../middlewares/validator.manager.js";

const router = express.Router();

router.get("/user", requireJwt, getUserImages);
router.get("/:id", requireJwt, paramIdValidator, getImage);
router.post("/upload", requireJwt, uploadImage);
router.delete("/delete/:id", requireJwt, paramIdValidator, deleteImage);

export default router;