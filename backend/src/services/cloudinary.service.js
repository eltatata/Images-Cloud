import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (buffer, uid) => {
  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: `${process.env.CLOUNDINARY_FOLDER}/${uid}` }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    }).end(buffer);
  });

  return response;
}

export const cloudinaryDelete = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
}

export const cloudinaryDeleteFolder = async (uid) => {
  await cloudinary.api.delete_resources_by_prefix(`${process.env.CLOUNDINARY_FOLDER}/${uid}`);
  await cloudinary.api.delete_folder(`${process.env.CLOUNDINARY_FOLDER}/${uid}`);
}