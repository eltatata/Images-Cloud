import { getProfileSevice } from "../services/profile.service.js";
import { handleHttp } from "../utils/http.manager.js";

export const getProfile = async (req, res) => {
  try {
    const uid = req.uid
    const user = await getProfileSevice(uid);
    res.status(200).json({ user: user });
  } catch (error) {
    handleHttp(res, error);
  }
}