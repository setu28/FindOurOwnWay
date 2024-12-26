const mongoose = require("mongoose");

//Defining the User Schema

const subTopicSchema = new mongoose.Schema(
    {
        name: {
            type: [String],
            required : true,
            trim: true,
        },
        topicsAssociated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",  
        }],
    },
    {timestamps: true}
);

module.exports=mongoose.model("SubTopic",subTopicSchema);