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
    const images = await getImagesService(uid);
    res.status(200).json({ images });
  } catch (error) {
    handleHttp(res, error);
  }
}

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageService(id);
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
    const image = await deleteImageService(id);
    res.status(200).json({ image });
  } catch (error) {
    handleHttp(res, error);
  }
}