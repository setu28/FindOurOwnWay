const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req,res) =>{
    try {
        
        const email = req.body.email;
        const user = User.findOne({email: email});
        if(!user){
            return res.status(500).json({
                success: "false",
                message: "This email is not registered with us",
            });
        }
        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 360000,
            },
            {new: true}
        );

        console.log("updated details",updatedDetails);
        const url = `http://localhost:3001/update-password/${token}`;
        //Need to configure after nodeMailer integration


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in resetting token",
            error: error.message,
        });
    }
}

exports.resetPassoword = async (req,res) =>{
    try {
        
        const {password, confirmPassword, token} = req.body;
        //Checking if password and confirm password match 
        if(password != confirmPassword){
            return res.status(500).json({
                success: false,
                message: "Password and confirm Password does not match",
            });
        }

        //Finding whether user exist with this token
        const userDetails = await User.findOne({ token: token});
        if(!userDetails){
            return res.status(500).json({
                success: false,
                message: "User with this token not found",
            });
        }

        //Checking if token is valid
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(500).json({
                success: false,
                message: "Token is expired, Please re-generate",
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            {email: email},
            {password: encryptedPassword},
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "Password Update Successfull",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to re-set password",
            message: error.message,
        })
    }
}