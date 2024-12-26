const mongoose = require("mongoose");

//Defining the User Schema

const OldPapersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
        },
        
    },
    {timestamps: true}
);

module.exports=mongoose.model("OldPapers",OldPapersSchema);