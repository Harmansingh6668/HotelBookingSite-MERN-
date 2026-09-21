const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: { 
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },  
        phone: {
            type: String,
            required: true, 
            trim: true,
        },
        role: {
            type: String,
            enum:["CUSTOMER", "HOTEL_ADMIN", "SUPER_ADMIN"],
            default: "CUSTOMER",
        },
        status: {
            type: String,
            enum: ["ACTIVE", "PENDING", "SUSPENDED"],
            default: "ACTIVE",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;