const Hotel = require("./hotel.model");

const findAllHotels = async (city) => {
    const query = { status: "ACTIVE" };
    if (city) {
        query.city = city;
    }
    return await Hotel.find(query).sort({ createdAt: -1 });
};

const findHotelById = async (hotelId) => {
    return await Hotel.findOne(
        { _id: hotelId, 
            
            status: "ACTIVE" })
        };


        module.exports = {
            findAllHotels,
            findHotelById,
        };
