const mongoose = require("mongoose");

//Defining the User Schema

const relatedTopicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        status:{
            type: Boolean,
            //required : true,
        },
        notesLink:{
            type: String,
        },
        YoutubeLink:{
            type: String,
        },
        subTopicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTopic",  
        }],
        
    },
    {timestamps: true}
);

module.exports=mongoose.model("RelatedTopic",relatedTopicSchema);