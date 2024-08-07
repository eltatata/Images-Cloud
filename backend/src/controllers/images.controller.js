import {
  deleteImageService,
  getImageService,
  getImagesService,
  uploadImageService
} from "../services/images.service.js";
import { handleHttp } from "../utils/http.manager.js";

export const getImages = async (req, res) => {
  try {
    const uid = req.uid
    const page = parseInt(req.query.page) || 1;
    const limit = 20
    const skip = (page - 1) * limit;
    const data = await getImagesService(uid, skip, limit);
    res.status(200).json(data);
  } catch (error) {
    handleHttp(res, error);
  }
}

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const uid = req.uid;
    const image = await getImageService(id, uid);
    res.status(200).json({ image: image });
  } catch (error) {
    handleHttp(res, error);
  }
}

export const uploadImage = async (req, res) => {
  try {
    const data = {
      image: req.file,
      name: req.body.name,
      description: req.body.description,
      uid: req.uid
    };
    const image = await uploadImageService(data);
    res.status(201).json({ image });
  } catch (error) {
    handleHttp(res, error);
  }
}

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const uid = req.uid;
    const image = await deleteImageService(id, uid);
    res.status(200).json({ image });
  } catch (error) {
    handleHttp(res, error);
  }
}