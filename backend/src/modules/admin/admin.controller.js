const adminService = require("./admin.service");
const adminImageService = require("./admin.image.service");


// --------------------------------
// Dashboard
// --------------------------------

const getDashboard = async (req, res) => {
  try {
    const dashboard =
      await adminService.getDashboard(req.user);

    return res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get hotel
// --------------------------------

const getHotel = async (req, res) => {
  try {
    const hotel =
      await adminService.getHotel(req.user);

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Update hotel
// --------------------------------

const updateHotel = async (req, res) => {
  try {
    const hotel =
      await adminService.updateHotel(
        req.user,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadHotelImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Choose an image to upload.",
    });
  }

  try {
    const image = await adminImageService.uploadHotelImage(req.user, req.file);

    return res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    return res.status(error.statusCode || 502).json({
      success: false,
      message: error.message || "Unable to upload hotel image.",
    });
  }
};


module.exports = {
  getDashboard,
  getHotel,
  updateHotel,
  uploadHotelImage,
};