import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.SECRET);
  return payload;
};