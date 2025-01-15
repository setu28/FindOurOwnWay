const express = require("express");
const router = express.Router()

//Import the required controllers and middleswares
const {
    signup,
    signupMentor,
    signupStudent,
    login,
    sendotp,
    verifyotp,
} = require("../controllers/Auth")

const {
    createAdressRecordForUser,
} = require("../controllers/Address")

const {
    resetPasswordToken,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

//Routes for login,signup and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Routes for user login


//Routes for users signup
router.post("/signup/user",signup);
router.post("/signup/student",signupStudent);
router.post("/signup/mentor",signupMentor);

//Route for Address record creation during signup
router.post("/signup/address",createAdressRecordForUser);

//Route for Logging in
router.post("/login",login);





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

