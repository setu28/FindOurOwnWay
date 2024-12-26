const mongoose = require("mongoose");

//Defining the User Schema

const addressSchema = new mongoose.Schema(
    {
        addressLine1: {
            type: String,
            required: true,
            trim: true,
        },
        addressLine2: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: Number,
            required: true,
            trim: true,
        },
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  
        },
    },
    {timestamps: true}
);

module.exports=mongoose.model("Address",addressSchema);