const bcrypt = require("bcrypt");
const User = require("../models/User");

const OTP = require("../models/OTP");

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

require("dotenv").config();

//SignUp Controller for Registering User


exports.signup = async (req,res) =>{

    try{

        const {
            firstName,
            lastName,
            middleName,
            gender,
            phoneNumber,
            password,
            confirmPassword,
            otp,
            isAdmin,
            secretKey,
            
        }= req.body;
        
        const email = req.body.email.email;

        //Checking if all details are present or not
        if( !firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword){
            console.log("coming inside this if");
            return res.status(403).send({
                success: false,
                message: "All fields are required",
            });
        }
        
        //Checking if passoword and confirmed password match
        if(password != confirmPassword){
            return res.status(400).send({
                success: false,
                message: "Passowrd and confirmed password does not match",
            });
        }
        console.log(email);

        //Checking if the user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: "User already present",
            });
        }
        /*
        //Finding the most recent OTP for the email
        //const response = OTP.find({email}).sort({ createdAt: -1}).limit(1);
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        //console.log(response1);

        
        if(response.length == 0){
            //If OTP not found
            return res.status(400).send({
                success: false,
                message: "OTP not found",
            });
        }
        else if(otp!= response[0].otp){
            //OTP does not match
            return res.status(400).send({
                success: false,
                message: "OTP does not match",
            });
        }
        */

        // Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

        //Creating a User
        
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
        });
        

        if(secretKey){
            const adminDetails = await Admin.create({
                secretKey: secretKey,
                user: newUser._id
            });
            console.log("admin conisdered");
            await User.findByIdAndUpdate(newUser._id,
            {isAdmin: true,});
            return res.status(200).json({
                success: true,
                newUser,
                adminDetails,
                message: "Admin registered",
            })
        }
        

        return res.status(200).json({
            success: true,
            newUser,
            message: "User registered Successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later",
            error: error.message,
        });
    }
};



//LogIn Controller for authenticating user Whether he is admin or not
exports.login = async(req,res)=>{
    try{
        //Get email and password from email body
        const { email, password} = req.body;
        
        //Check if email || password is missing or not
        if(!email || !password){
            //Return with bad request that data is not present
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields",
            });
        }

        //Find user with provided email
        const user = await User.findOne({email});
        const adminId = user._id;

        const admin = await Admin.findOne({user: adminId});

        //If user not found
        if(!user || !admin || !user.isAdmin){
            return res.status(400).json({
                success:false,
                message: "Details Not Found"
            });
        }

        // Generate JWT token and Compare Password
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
				{ email: user.email, id: admin._id},
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

            //Save token
            user.token = token;
            user.password = undefined;
            // Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
            res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "User Login Success",
			});
        }
        else{
            return res.status(400).json({
                success:false,
                message: "Password is incorrect",
            }); 
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to log in , Please try again Later",
        });
    }
};



//Send otp for verification
exports.sendotp = async(req,res)=>{
    try{

        const { email } = req.body;

        //Check if the user is already present
        //Finding user if present with this email
        const checkUser = await User.findOne({email});

        //If user found
        if(checkUser){
            return res.status(500).json({
            success:false,
            message: "User with this email already present",
            });
        }
        
        var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
        const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Unable to generate OTP",
        });

    }
};

exports.verifyotp = async(req,res)=>{
    try {
        
        console.log(req.body);
        const otp = req.body.otp;
        const email = req.body.email.email;
        console.log(otp,email);
        if(!otp || !email){
            return res.status(500).json({
                success: false,
                message: "Details missing in response",
            });
        }
        console.log("Inside controller",otp,email,req.body);
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if(!response){
            return res.status(500).json({
                success: false,
                message: "OTP not found",
            });
        }
        return res.status(200).json({
            success: true,
            response,
            message: "OTP found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to find OTP",
            error: error.message,
        })
        
    }
    
}

//Controller for changing password
exports.changePassword = async(req,res)=>{
    try{
        //Get data from user
        const userDetails = await User.findById(req.user.id);

        //Get old password, new password and confirm new password
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //Validate Old Password
        const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);

        if(!isPasswordMatch){
            //If old password does not match, returning error
            return res.status(401).json({
                success: false,
                message: "Passowrd does not match the old passwprd",
            }) 
        }

        //Checking new passowrd and confirmPassword
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message: "passowrds does not match",
            });
        }

        //Updating passowrd
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new : true},
        )

        //Sending notification of passowrd change
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        return res.status(200).json({
            success: true,
            message: "Passoword updated",
        });
    }
    catch(error){
        //If there is any error in updating in passowrd returning error 
        return res.status(500).json({
            success:true,
            message: "Unable to update passowrd",
            error: error.message,
        });
    }
};