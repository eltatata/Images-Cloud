import express from "express";
import { deleteImage, getImage, getImages, uploadImage } from "../controllers/images.controller.js";
import { paramIdValidator } from "../utils/validator.manager.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";
import { requireJwt } from "../middlewares/token.middleware.js";

const router = express.Router();

router.get("/", requireJwt, getImages);
router.get("/:id", requireJwt, paramIdValidator, getImage);
router.post("/", requireJwt, uploadMiddleware.single("image"), uploadImage);
router.delete("/:id", requireJwt, paramIdValidator, deleteImage);

export default router;