import {
  deleteImageService,
  getImageService,
  getImagesService,
  uploadImageService
} from "../services/images.service.js";

export const getImages = async (req, res) => {
  try {
    const uid = req.uid
    const images = await getImagesService(uid);
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageService(id);
    res.status(200).json({ image: image });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
}

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await deleteImageService(id);
    res.status(200).json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}