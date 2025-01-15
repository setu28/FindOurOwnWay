import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
import { setEmail,setAccType } from "../../slices/profileSlice";
import { setUser,setUserFlag,setUserId,setPanditId } from "../../slices/profileSlice";
import { endpoints } from "../apis";



const {
    LOGINPandit_API,
    LOGINCustomer_API,
    LOGINAdmin_API,
    SENDOTP_API,
    VERIFYOTP_API,
    User_Creation_API,
    Student_Creation_API,
    CUSTOMER_CREATION_API,
    Address_Creation_API,
} = endpoints

export function login(email, password, accountType,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log(accountType);
        var response;
        dispatch(setLoading(true));
        try {
            if(accountType == 'Customer'){
                response = await apiConnector("POST", LOGINCustomer_API,{
                    email, 
                    password,
                });
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                dispatch(setToken(response.data.token));
                dispatch(setUser({...response.data}));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");

            }
            else if(accountType == 'Pandit'){
                response = await apiConnector("POST", LOGINPandit_API,{
                    email, 
                    password,
                });
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                dispatch(setToken(response.data.token));
                dispatch(setUser({...response.data}));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            }
            else{
                response = await apiConnector("POST",LOGINAdmin_API,{
                    email,
                    password,
                });
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                dispatch(setToken(response.data.token));
                dispatch(setUser({...response.data}));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/home/Admin");
            }
            console.log("LOGIN API RESPONSE",response);
            toast.success("LogIn Successfull");
            

        } catch (error) {
            console.log("LOGIN API error", error);
            toast.error("LogIn Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function sendotp(email,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API,{email})
            console.log("SEND OTP response...",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP sent successfully");
            navigate("/verify-otp");
            dispatch(setEmail({email}));
        } catch (error) {
            console.log("SEND OTP error",error);
            toast.error("OTP NOT SENT");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
       
    }
}

export function verifyotp(otp,email,navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...");
        console.log("INSide verify otp in AutAPi",otp,email);
        dispatch(setLoading(true));
        try {
            console.log("Inside Auth API");
            console.log(email);
            const response = await apiConnector("POST",
            VERIFYOTP_API,{
                email,
                otp,
            });
            console.log("VERIFT_OTP Response",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP verified");
            dispatch(setLoading(false));
            navigate("/signupForm");
        } catch (error) {
            console.log("Error",error);
            toast.error("OTP ERROR");
        }
        toast.dismiss(toastId);
    }
}

export function createUser(email, password, confirmPassword,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("...Loading");
        dispatch(setLoading(true));
        try {
            console.log("inside user creation",email);
            const response = await apiConnector("POST", User_Creation_API,{
                email, password, confirmPassword,
            });
            console.log("Create User API response",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("User Created Successfully");
            console.log("We are in auth API");
            console.log(response.data.newUser._id);
            dispatch(setUserId(response.data.newUser._id));
            navigate("/signupForm");
        } catch (error) {
            console.log("Create User Erro",error);
            toast.error("User not created");
            
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function createStudent(firstName,lastName,gender,age,email,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("...Loading");
        console.log("We are in creating Pandit",firstName);
        dispatch(setLoading(true));
        
        try {
            const response = await apiConnector("POST", Student_Creation_API,{
                firstName,lastName,
                gender,age,email,
            });
            console.log("Create Pandit Response",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Student record created",response);
            //dispatch(setPanditId(response.data.pandit._id));
            navigate("/signup/addressDetails");
        } catch (error) {
            console.log("Student cannot be created",error);
            toast.error("Student cannot be created");
        }
            
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}

export function createCustomer(navigate,userId){
    return async(dispatch) =>{
        const toastId = toast.loading("...Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CUSTOMER_CREATION_API,{
                userId,
            },
            );
            console.log("Create Customer Record",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("User record created");
            navigate("/signup/address");
        } catch (error) {
            console.log("Create User record error",error);
            toast.error("User record cannot be created");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function createAddress(addressLine1, addressLine2,city,state,pincode,userId,navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("...Loading");
        dispatch(setLoading(true));
        try {
            console.log("Inside create address",userId);
            const response = await apiConnector("POST", Address_Creation_API,{
                addressLine1, addressLine2,
                city,state,pincode,userId
            });
            console.log("Create Address Record response",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Address record created, Please log in Again");
            /*
            dispatch(setAccType(null))
            dispatch(setUser(null))
            dispatch(setEmail(null))
            dispatch(setUserId(null))
            dispatch(setPanditId(null))
            */
            navigate("/");
        } catch (error) {
            console.log("Create Address Error",error);
            toast.error("Address record not created");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
    

}

export function logout(navigate) {
    return (dispatch) => {
        
        dispatch(setToken(null))
        dispatch(setAccType(null))
        dispatch(setUser(null))
        dispatch(setEmail(null))
        dispatch(setUserId(null))
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Log Out Done");
        
        navigate("/")
    }
}