const multer = require("multer");

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Upload a JPEG, PNG, WebP, or GIF image.");
      error.statusCode = 400;
      callback(error);
      return;
    }

    callback(null, true);
  },
}).single("image");

const uploadImage = (req, res, next) => {
  imageUpload(req, res, (error) => {
    if (error) {
      if (error instanceof multer.MulterError) {
        error.statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        error.message =
          error.code === "LIMIT_FILE_SIZE"
            ? "Image must be 5 MB or smaller."
            : "Unable to process the uploaded image.";
      }

      next(error);
      return;
    }

    next();
  });
};

module.exports = {
  uploadHotelImage: uploadImage,
  uploadRoomImage: uploadImage,
};
