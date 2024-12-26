const mongoose = require("mongoose");

//Defining the User Schema

const mentorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type:String,
            required: true,
            trim: true,
        },
        middleName: {
            type:String,
            trim: true,
        },
        gender: {
            type:String,

        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        dateOfBirth: {
            type:String,
        },
        approved: {
			type: Boolean,
			default: true,
		},
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  
        },
    },
    {timestamps: true}
);

module.exports=mongoose.model("Mentor",mentorSchema);