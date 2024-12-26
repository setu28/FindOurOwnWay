import { apiConnector } from "../apiConnector";
import { toast, Toast } from "react-hot-toast";
import { adminEndpoints } from "../apis";
const {
    APPROVEPANDIT_API,
} = adminEndpoints

export const approvePandit = async(panditId) =>{
    let result = null;
    try {
        console.log("Inside approve Pandit function");
        const response = await apiConnector("POST" ,APPROVEPANDIT_API,{panditId},null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data;
        console.log("Result is ",result);
    } catch (error) {
        console.log("Error in gettting results",error);
        toast.error("Something wrong");
    }
    return result;
}