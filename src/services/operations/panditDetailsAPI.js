import { apiConnector } from "../apiConnector";
import { toast, Toast } from "react-hot-toast";
import { endpoints } from "../apis";
import { panditendpoints } from "../apis";
const {
    GETALLPANDITS_API,
    GETFILTEREDPANDITS_API,
    GETNONAPPROVEDPANDITSCOUNT_API,
    GETNONAPPROVEDPANDITSLIST_API,
    GETNONAPPROVEDFILTEREDPANDITSLIST_API,
    GETPANDITRECORD_API,
} = panditendpoints;

const {
    UpdatePujaNameDetailsToPanditProfile_API,
} = endpoints

export const getALlPanditDetails = async(location) => {
   
        let result = null;
        
        try {
            console.log("We are trying to get all the pandit details",GETALLPANDITS_API);
            const response = await apiConnector("GET", GETALLPANDITS_API,{
                location,
            });
            console.log("pandit details",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            result = response?.data.data;
        } catch (error) {
            console.log("Error in getting pandit details",error);
            toast.error("Something wrong");
        }
        
        return result;
    
}

export const getFilterPanditDetails = async(filter,filtervalue) =>{
    let result=null;
    try {
        console.log("We are trying to get all the filyered pandit details",filter,filtervalue);
        const response = await apiConnector("POST",GETFILTEREDPANDITS_API,{filter,filtervalue},null);
        console.log("Filtered pandit details",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data.data;
    } catch (error) {
        console.log("Error in getting filtered pandit details",error);
        toast.error("Something wrong");
    }
    return result;
}

export const getNonApprovedPanditCount = async()=>{
    let result = null;
    try {
        console.log("We are trying to get details");
        const response = await apiConnector("GET",GETNONAPPROVEDPANDITSCOUNT_API,null,null);
        console.log(response);
        console.log("Non Approved Pandits Count");
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data.count;
        console.log("Sending resuly",result);
    } catch (error) {
        console.log("Error in getting details");
        toast.error("Something wrong");
    }
    return result;
}

export const getNonApprovedPanditList = async(location)=>{
    let result = null;
    try {
        console.log("We are trying to get details of Non Approved Pandit List");
        const response = await apiConnector("GET",GETNONAPPROVEDPANDITSLIST_API,null,null);
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data;
        console.log("Sending result",result);
    } catch (error) {
        console.log("Error in getting details",error);
        toast.error("Something wrong");
    }
    return result;
}

export const getNonApprovedFilteredPanditList = async(filter,filtervalue)=>{
    let result = null;
    try {
        console.log("We are trying to get details");
        const response = await apiConnector("POST",GETNONAPPROVEDFILTEREDPANDITSLIST_API,{
            filter,
            filtervalue
        },null);
        console.log(response);
        console.log("Non Approved Pandits Count");
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data.data;
        console.log("Sending resuly",result);
    } catch (error) {
        console.log("Error in getting details");
        toast.error("Something wrong");
    }
    return result;
}

export const getPanditDetails = async(panditId) =>{
    let result = null;
    try {
        console.log("We are trying to get individual pandit details");
        const response = await apiConnector("POST",GETPANDITRECORD_API,{
            panditId,
        },null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data;
        console.log("result is ",result);
    } catch (error) {
        console.log("Error in getting results",error);
        toast.error("Something errror");
    }
    return result;
}

export const updatePujaNamesToPanditProfile = async(panditId,responseDetails,navigate)=>{
    let result=null;
    try {
        console.log("We are trying to update Puja Names to Pandit Profile",panditId,responseDetails);
        const response = await apiConnector("POST",UpdatePujaNameDetailsToPanditProfile_API,{panditId,responseDetails},null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response?.data;
        navigate("/signup/address");

        console.log("Result is ",result);
    } catch (error) {
        console.log("Error in getting results",error);
        toast.error("Something wrong");
    }
}


