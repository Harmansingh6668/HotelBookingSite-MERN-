const cloudinary = require("cloudinary").v2;

const uploadImage = (user, file, imageType) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    const error = new Error("Cloudinary upload is not configured on the server.");
    error.statusCode = 503;
    throw error;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `hotel-booking/${imageType}/${user.hotelId}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary did not return an image URL."));
          return;
        }

        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

const uploadHotelImage = (user, file) => uploadImage(user, file, "hotels");
const uploadRoomImage = (user, file) => uploadImage(user, file, "rooms");

module.exports = { uploadHotelImage, uploadRoomImage };
