const Address = require("../models/Address");
const User = require("../models/User");

//Create Address Record
exports.createAdressRecordForUser = async(req,res) =>{
    try {

        const {
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            userId,
        } = req.body;

       
        
        //If any information missing return with error
        if(!addressLine1 || !addressLine2 || !city || !state || !pincode || !userId){
            return res.status(500).json({
                success:false,
                message: "Please fil all the required information",
            });
        }
        
        const address = await Address.create({
            addressLine1:addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            pincode: pincode,
        });

        
        
        const userDetails = await User.findByIdAndUpdate(userId,{
            addressInfo: address._id,
        })
       
        
        
        //User record creation successfully
        return res.status(200).json({
            success: true,
            message: "User Address record creation done and updated Record",
            address,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to create or update address record",
            error: error.message,
        });
    }
}
