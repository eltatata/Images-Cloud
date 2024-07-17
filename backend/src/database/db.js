import mongoose from "mongoose";

try {
  const db = await mongoose.connect(process.env.URI);
  console.log(`conectado a MongoDB`);
} catch (error) {
  console.log(`Error de conexion a DB: ${error}`);
}