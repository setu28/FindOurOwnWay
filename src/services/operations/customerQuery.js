import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import {contactendpoints} from "../apis";
const {
    CUSTOMERQUERY_API
} = contactendpoints;

export const submitCustomerQuery = async(data)=>{
    let result = null;
    try {
        console.log("We are inside submitCustomerQuery",data);
        
        //const q = data.data;
        //console.log("We are inside submitCustomerQuery",q);
        const response = await apiConnector("POST",CUSTOMERQUERY_API,{data});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response?.data.data;
    } catch (error) {
        console.log("We are running into error",error);
        toast.error("Something wrong");
    }
    return result;
}