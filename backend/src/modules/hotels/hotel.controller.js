const hotelService = require("./hotel.service");

const getHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels(req.query.city);

    return res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(
      req.params.id
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel fetched successfully",
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getHotels,
  getHotel,
};