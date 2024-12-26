const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

//This function is used as middlewares to aunthenticate users
exports.auth = async(req,res,next) =>{
    try {
        console.log("here we are in the middleware",req.body.token);
        //Extracting JWT from request cookies, body or header
        const token = req.body.token;
        //req.cookies.token || 
        
        //req.header("Authorization").replace("Bearer ", "");

        console.log("here");

        //If JWT is missing return 401 unathorized user
        if(!token){
            return res.status(500).json({
                success: false,
                message: "Token missing",
            });
        }

        try {
            //Verifying the JWT using secret key stored in enviroment varibale
            console.log("coming inside try");
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("printing for testing",decode);
            //Storing the JWT payload in the request object for further use
            req.user = decode;
            console.log("called");
        } catch (error) {
            //If JWT verification fails, returns 401 unauthorized error
            return res.status(500).json({
                success: false,
                message: "token is invalid",
            });
        }
        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        //If there is an error in unauthorized
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating token",
        })   
    }
};

