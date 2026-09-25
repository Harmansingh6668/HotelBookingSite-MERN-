const User = require("../users/user.model");
const Hotel = require("../hotels/hotel.model");
const Room = require("../rooms/room.model");
const Booking = require("../bookings/booking.model");
const Review = require("../reviews/review.model");

// --------------------------------
// Dashboard statistics
// --------------------------------

const getDashboardStatistics = async () => {
  // ------------------------------
  // Users
  // ------------------------------

  const totalCustomers = await User.countDocuments({
    role: "CUSTOMER",
  });

  const totalHotelAdmins = await User.countDocuments({
    role: "HOTEL_ADMIN",
  });

  const activeHotelAdmins = await User.countDocuments({
    role: "HOTEL_ADMIN",
    status: "ACTIVE",
  });

  // ------------------------------
  // Hotels
  // ------------------------------

  const totalHotels = await Hotel.countDocuments();

  const activeHotels = await Hotel.countDocuments({
    status: "ACTIVE",
  });

  const inactiveHotels = await Hotel.countDocuments({
    status: "INACTIVE",
  });

  const completedHotels = await Hotel.countDocuments({
    profileCompleted: true,
  });

  const incompleteHotels = await Hotel.countDocuments({
    profileCompleted: false,
  });

  // ------------------------------
  // Rooms
  // ------------------------------

  const totalRooms = await Room.countDocuments();

  const availableRooms = await Room.countDocuments({
    status: "AVAILABLE",
  });

  const bookedRooms = await Room.countDocuments({
    status: "BOOKED",
  });

  const maintenanceRooms = await Room.countDocuments({
    status: "MAINTENANCE",
  });

  // ------------------------------
  // Bookings
  // ------------------------------

  const totalBookings = await Booking.countDocuments();

  const pendingBookings = await Booking.countDocuments({
    status: "PENDING",
  });

  const confirmedBookings = await Booking.countDocuments({
    status: "CONFIRMED",
  });

  const cancelledBookings = await Booking.countDocuments({
    status: "CANCELLED",
  });

  const completedBookings = await Booking.countDocuments({
    status: "COMPLETED",
  });

  // ------------------------------
  // Reviews
  // ------------------------------

  const totalReviews = await Review.countDocuments();

  // ------------------------------
  // Revenue
  // ------------------------------

  const revenueResult = await Booking.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const totalRevenue =
    revenueResult.length > 0
      ? revenueResult[0].totalRevenue
      : 0;

  // ------------------------------
  // Return dashboard
  // ------------------------------

  return {
    hotels: {
      total: totalHotels,
      active: activeHotels,
      inactive: inactiveHotels,
      completed: completedHotels,
      incomplete: incompleteHotels,
    },

    hotelAdmins: {
      total: totalHotelAdmins,
      active: activeHotelAdmins,
    },

    customers: {
      total: totalCustomers,
    },

    rooms: {
      total: totalRooms,
      available: availableRooms,
      booked: bookedRooms,
      maintenance: maintenanceRooms,
    },

    bookings: {
      total: totalBookings,
      pending: pendingBookings,
      confirmed: confirmedBookings,
      cancelled: cancelledBookings,
      completed: completedBookings,
    },

    reviews: {
      total: totalReviews,
    },

    revenue: {
      total: totalRevenue,
    },
  };
};

// --------------------------------
// Get all hotels
// --------------------------------

const getAllHotels = async () => {
  return await Hotel.find().sort({
      createdAt: -1,
    });
};

// --------------------------------
// Get hotel by ID
// --------------------------------

const getHotelById = async (hotelId) => {
  return await Hotel.findById(hotelId);
};

// --------------------------------
// Find hotel admin
// --------------------------------

const findHotelAdmin = async (hotelId) => {
  return await User.findOne({
    hotelId,
    role: "HOTEL_ADMIN",
  }).select("name email phone status");
};

// --------------------------------
// Get hotel rooms
// --------------------------------

const getHotelRooms = async (hotelId) => {
  return await Room.find({
    hotelId,
  }).sort({
    roomNumber: 1,
  });
};

// --------------------------------
// Get hotel bookings
// --------------------------------

const getHotelBookings = async (hotelId) => {
  return await Booking.find({
    hotelId,
  })
    .populate(
      "userId",
      "name email phone"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Get hotel reviews
// --------------------------------

const getHotelReviews = async (hotelId) => {
  return await Review.find({
    hotelId,
  })
    .populate(
      "userId",
      "name email"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Update hotel status
// --------------------------------

const updateHotelStatus = async (
  hotelId,
  status
) => {
  return await Hotel.findByIdAndUpdate(
    hotelId,
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};


// --------------------------------
// Get all hotel admins
// --------------------------------

const getAllHotelAdmins = async () => {
  return await User.find({
    role: "HOTEL_ADMIN",
  })
    .select("name email phone role hotelId status emailVerified createdAt")
    .populate(
      "hotelId",
      "name address city country status profileCompleted"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Get hotel admin by ID
// --------------------------------

const getHotelAdminById = async (adminId) => {
  return await User.findOne({
    _id: adminId,
    role: "HOTEL_ADMIN",
  })
    .select("name email phone role hotelId status emailVerified createdAt")
    .populate(
      "hotelId",
      "name address city country status profileCompleted"
    );
};

// --------------------------------
// Update hotel admin status
// --------------------------------

const updateHotelAdminStatus = async (
  adminId,
  status
) => {
  return await User.findOneAndUpdate(
    {
      _id: adminId,
      role: "HOTEL_ADMIN",
    },
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate(
    "hotelId",
    "name address city country status profileCompleted"
  );
};

// --------------------------------
// Get all bookings
// --------------------------------

const getAllBookings = async () => {
  return await Booking.find()
    .populate(
      "userId","name email phone"
    )
    .populate(
      "hotelId","name address city country"
    )
    .populate(
      "rooms.roomId", "roomNumber roomType pricePerNight"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Get booking by ID
// --------------------------------

const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId)
    .populate(
      "userId","name email phone"
    )
    .populate(
      "hotelId","name address city country"
    )
    .populate(
      "rooms.roomId","roomNumber roomType pricePerNight"
    );
};




// --------------------------------
// Get all reviews
// --------------------------------

const getAllReviews = async () => {
  return await Review.find()
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "hotelId",
      "name city country"
    )
    .populate(
      "bookingId",
      "checkInDate checkOutDate totalAmount status paymentStatus"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Get review by ID
// --------------------------------

const getReviewById = async (reviewId) => {
  return await Review.findById(reviewId)
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "hotelId",
      "name city country"
    )
    .populate(
      "bookingId",
      "checkInDate checkOutDate totalAmount status paymentStatus"
    );
};

// --------------------------------
// Delete review
// --------------------------------

const deleteReview = async (reviewId) => {
  return await Review.findByIdAndDelete(reviewId);
};



module.exports = {
  getDashboardStatistics,
  getAllHotels,
  getHotelById,
  findHotelAdmin,
  getHotelRooms,
  getHotelBookings,
  getHotelReviews,
  updateHotelStatus,
  getAllHotelAdmins,
  getHotelAdminById,
  updateHotelAdminStatus,

  
  getAllBookings,
  getBookingById,

  getAllReviews,
getReviewById,
deleteReview,
};