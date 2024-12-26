const mongoose = require("mongoose");

//Defining the User Schema

const RoadmapSubjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        url: {
            type: String,
            required : true,
            trim: true,   
        },
        mentorAssociated: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  
        },
        studentsAssociated:  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",  
        }],
        studentsLiked: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",  
        }],
        topicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",  
        }],
        tagsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",  
        }],
        SamplePapersAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SamplePaper",  
        }],
    },
    {timestamps: true}
);

module.exports=mongoose.model("RoadmapSubject",RoadmapSubjectSchema);