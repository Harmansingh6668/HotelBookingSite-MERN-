const adminService = require("./admin.service");

const getHotel = async (req, res) => {
  try {
    const hotel = await adminService.getHotel(req.user);

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

const updateHotel = async (req, res) => {
  try {
    const hotel = await adminService.updateHotel(
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

module.exports = {
  getHotel,
  updateHotel,
};