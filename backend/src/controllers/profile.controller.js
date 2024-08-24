import { deleteProfileService, getProfileSevice, updateProfileService } from "../services/profile.service.js";
import { handleHttp } from "../utils/http.manager.js";

export const getProfile = async (req, res) => {
  try {
    const uid = req.uid
    const user = await getProfileSevice(uid);
    res.status(200).json(user);
  } catch (error) {
    handleHttp(res, error);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const uid = req.uid
    const data = req.body
    const user = await updateProfileService(uid, data);
    res.status(200).json(user);
  } catch (error) {
    handleHttp(res, error);
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const uid = req.uid
    const user = await deleteProfileService(uid);
    res.status(200).json(user);
  } catch (error) {
    handleHttp(res, error);
  }
}