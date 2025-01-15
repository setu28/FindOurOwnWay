const mongoose = require("mongoose");

//Defining the User Schema

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
        },
        accountType: {
			type: String,
			enum: ["Admin", "Student", "Mentor"],
			//required: true,
		},
        addressInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",  
        },
    },
    {timestamps: true}
);

module.exports=mongoose.model("User",userSchema);