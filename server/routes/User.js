const express = require("express");
const router = express.Router()

//Import the required controllers and middleswares
const {
    login,
    loginPandit,
    loginCustomer,
    signup,
    sendotp,
    changepassword,
    verifyotp,
} = require("../controllers/Auth")





const {
    resetPasswordToken,
    resetPassoword
} = require("../controllers/ResetPassword")



const { auth } = require("../middlewares/auth")


//Routes for login,signup and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Routes for user login


//Routes for user signup
router.post("/signup",signup);

//Route for Address record creation during signup





//Route for sending otp to the user's email
router.post("/sendotp",sendotp);

router.post("/verify-otp",verifyotp);

//Route for changing password
//router.post("/changepassword",auth,changepassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

//Route for re-generating token
router.post("/reset-password-token",resetPasswordToken);

//Route for re-setting user's password
router.post("/reset-password");

//Export the router for use in main application
module.exports=router;

