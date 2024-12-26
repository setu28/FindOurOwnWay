const mongoose = require("mongoose");

//Defining the User Schema

const SamplePaperSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        tagsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",  
        }],
        topicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",  
        }],
        ResourcesAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",  
        }],
        StudentsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",  
        }],
        
    },
    {timestamps: true}
);

module.exports=mongoose.model("SamplePaper",SamplePaperSchema);