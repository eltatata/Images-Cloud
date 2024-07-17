import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const passwordHash = await bcryptjs.hash(password, 8);
  return passwordHash;
};

export const comparePassword = async (password, hashedPassword) => {
  const isValid = await bcryptjs.compare(password, hashedPassword);
  return isValid;
};