import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Image } from "../models/Image.js";

// configuracion de multer
const storage = multer.memoryStorage(); // guardar el archivo de la imagen en memoria
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            // Aceptar solo archivos cuyo tipo MIME comience con 'image/' (es decir, imágenes)
            cb(null, true);
        } else {
            // Rechaza otros tipos de archivos
            cb(new Error('El archivo no es una imagen'), false);
        }
    }
}).single("file");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const uploadImage = async (req, res) => {
    upload(req, res, async (err) => {
        try {
            // capturar posibles fallos
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Fallo el procesamiento del archivo, Error: ' + `${err.message}` });
            }
            if (err) return res.status(400).json({ error: err.message });

            // obtener el buffer de la imagen
            const buffer = req.file.buffer;

            // subir la imagen a cloudinary
            const cloudinaryResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: process.env.CLOUNDINARY_FOLDER }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                }).end(buffer);
            });

            // guardar la imagen en la base de datos
            const image = new Image({
                name: req.body.name, // nombre de la imagen
                description: req.body.description, // descripcion de la imagen
                width: cloudinaryResponse.width, // ancho de la imagen
                height: cloudinaryResponse.height, // alto de la imagen
                url : cloudinaryResponse.secure_url, // URL de cloudinary
                public_id: cloudinaryResponse.public_id, // public_id de cloudinary
                uid: req.uid // id del usuario que la creo
            })
            await image.save();

            console.log("Imagen subida");
            res.status(201).json({ upload: "Imagen subida" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

export const getUserImages = async (req, res) => {
    try {
        const uid = req.uid

        // obtener las imagenes que coincidan con el usuario logueado
        const images = await Image.find({ uid }).lean();

        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id).lean();
        if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

        res.status(200).json({ image: image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        // obtener imagen y eliminarla de la base de datos
        const image = await Image.findByIdAndDelete(id);
        if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

        const { public_id } = image; // public_id de la imagen a eliminar
        // eliminar imagen de cloudinary
        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (result.result == "ok") res.status(200).json({ deleteImage: "Imagen eliminada" });
            else res.status(500).json({ error: "Error al eliminar la imagen en Cloudinary" });
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}