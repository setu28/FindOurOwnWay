const mongoose = require("mongoose");

//Defining the User Schema

const booksSolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        resources:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",  
        },
        roadmapSubject: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoadmapSubject",  
        }],
        linkedTopics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",  
        }],
        mentorsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",  
        }],
        studentsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",  
        }],
    },
    {timestamps: true}
);

module.exports=mongoose.model("BooksSol",booksSolSchema);