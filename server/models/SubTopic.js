const mongoose = require("mongoose");

//Defining the User Schema

const subTopicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
            trim: true,
        },
        status:{
            type: Boolean,
            
        },
        notesLink:{
            type: String,
        },
        YoutubeLink:{
            type: String,
        },
        relatedTopicAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RelatedTopic",  
        }],
        topicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",  
        }],
    },
    {timestamps: true}
);

module.exports=mongoose.model("SubTopic",subTopicSchema);