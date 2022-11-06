import * as fs from "fs/promises";
import multer from "multer";
import { resolve } from "path";

export const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export const uploadFile = () => {
  return {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const filename = file.originalname;
        return callback(null, filename);
      },
    }),
  };
};

export const deleteFile = (filename: string) => {
  try {
    fs.stat(`${tmpFolder}/${filename}`);
  } catch (error) {
    return;
  }
  fs.unlink(`${tmpFolder}/${filename}`);
};
