const mongoose = require("mongoose");

//Defining the User Schema

const studentSchema = new mongoose.Schema(
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
        active: {
			type: Boolean,
			default: true,
		},
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  
        },
        IntrestedCategoriesOrTags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tags",  
            },
        ],
        IntrestedRoadmapSubjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RoadmapSubject",  
            },
        ],
        SubscribedRoadmapSubjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RoadmapSubject",  
            },
        ],
        SubscribedBooksSol: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BooksSol",  
            },
        ],
    },
    {timestamps: true}
);

module.exports=mongoose.model("Student",studentSchema);