import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { pujaNameEndpoints } from "../apis";
const {
    GETPANDITPUJANAMEDETAILS_API,
    GETPUJANAMELIST_API,
} = pujaNameEndpoints

export const getAllPanditAssociatedPujaNames = async(panditId) =>{
    let result=null;
    try {
        console.log("we are trying to get all the puja name details");
        const response = await apiConnector("POST",GETPANDITPUJANAMEDETAILS_API,{
            panditId,
        });
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("response is",response);
        result = response?.data;
        console.log("After",result);
    } catch (error) {
        console.log("error in getting results",error);
        toast.error("Something error");
    }
    return result;
}

export const getAllPujaNames = async()=>{
    let result = null;
    try {
        console.log("We are trying to get all puja Names avaialble");
        const response = await apiConnector("GET",GETPUJANAMELIST_API,null,null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data;
    } catch (error) {
        console.log("error in getting results",error);
        toast.error("Something error");
    }
    return result;
}


