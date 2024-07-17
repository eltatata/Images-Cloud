import { HttpError } from "./errors.manager.js";

export const handleHttp = (res, error) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
  } else {
    res.status(500).json({ error: `Error interno del servidor: ${error}` });
  }
}