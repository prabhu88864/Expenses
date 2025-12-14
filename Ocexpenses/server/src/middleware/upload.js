import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/receipts",
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
