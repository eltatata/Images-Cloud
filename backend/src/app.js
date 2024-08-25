import "dotenv/config";
import "./database/db.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { v2 as cloudinary } from 'cloudinary';

import authRouter from "./routes/auth.router.js";
import profileRouter from "./routes/profile.router.js";
import imagesRouter from "./routes/images.router.js";

const app = express();
const port = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const whileList = [process.env.ORIGIN1];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whileList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso denegado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());

app.use("/auth/", authRouter)
app.use("/profile/", profileRouter)
app.use("/images/", imagesRouter);

app.listen(port, () => {
  console.log(`Servicio levantado`);
})