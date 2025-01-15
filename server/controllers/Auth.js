const bcrypt = require("bcrypt");
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

const OTP = require("../models/OTP");

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

require("dotenv").config();

//SignUp Controller for Registering User


exports.signup = async (req,res) =>{
    try {
        console.log("We are inside signup");
        const{
            password,
            confirmPassword,
        }=req.body;
        const { email } = req.body.email;
        if(!email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message: "Please fill all the required fields",
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message: "Passwords do not match",
            });
        }
        /*
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message: "User already exists",
            });
        }
            */
        //Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //Create a new user
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
        });
        return res.status(200).json({
            success:true,
            message: "User created",
            newUser,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,  
            message: "Unable to create user",
            error: error.message,
        });
    }
};

exports.signupMentor = async (req,res) =>{
    try {
        const{
            firstName,
            lastName,
            middleName,
            gender,
            phoneNumber,
            dateOfBirth,
            experience,
        }=req.body;
        if(!firstName || !lastName || !middleName || !gender || !phoneNumber || !dateOfBirth || !experience){
            return res.status(400).json({
                success:false,
                message: "Please fill all the required fields",
            });
        }
        const newMentor = await Mentor.create({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gender: gender, 
            phoneNumber: phoneNumber,
            experience: experience,
            dateOfBirth: dateOfBirth,
        });
        return res.status(200).json({
            success:true,
            newMentor,
            message: "Mentor created",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Unable to create Mentor",
            error: error.message,
        });
        
    }
};

exports.signupStudent = async (req,res) =>{
    try {
        console.log("We are insde Student Making Controller");
        const{
            firstName,lastName,
            gender,age,email
        }=req.body;
        if(!firstName || !lastName || !gender || !age){
            return res.status(400).json({
                success:false,
                message: "Please fill all the required fields",
            });
        }
        const newStudent = await Student.create({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
        });

        //Update User Details
        const userDetails = await User.findOne({email});
        const updatedUserDetails = await User.findByIdAndUpdate((userDetails._id),{
            accountType: "Student",
        });
        if(!updatedUserDetails){
            return res.status(500).json({
                success:false,
                message: "Unable to update User",
            });
        }
        return res.status(200).json({
            success:true,
            newStudent,
            updatedUserDetails,
            message: "Student created",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Unable to create Student",
            error: error.message,
        });
    }
};



//LogIn Controller
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

        

        //If user not found
        if(!user){
            return res.status(400).json({
                success:false,
                message: "Details Not Found"
            });
        }

        // Generate JWT token and Compare Password
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType},
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
    /*
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
        */
};

/*
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
*/