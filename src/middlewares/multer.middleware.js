import multer from "multer";
import { customAlphabet } from "nanoid";

const nanoidCustom = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10,
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${nanoidCustom()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage,
});
