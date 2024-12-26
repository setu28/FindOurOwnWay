const mongoose = require("mongoose");

//Defining the User Schema

const topicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        subTopicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTopic",  
        }],
        
    },
    {timestamps: true}
);

module.exports=mongoose.model("Topic",topicSchema);