const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(    
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true, 
    },
    city: {
        type:String,
        required: true,  
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
        default: "India",
    },
    image: {
        type: [String],
        default: [],
    },
    amenities: {   
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,     



    },
    reviewsCount: {
        type: Number,
        default: 0,
    },          

    status: {   
      type: String, 
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    },
},
{timestamps: true}
);      

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;