import { apiConnector } from "../apiConnector";
import { availabilityendpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
    CREATEAVAILABILITY_API,
    CHECKAVAILABILITY_API,
} = availabilityendpoints
/*
export function createAvailability(myValue){
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST",CREATEAVAILABILITY_API,{
                myValue
            });
            console.log("checking response value");
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            console.log(response);
            toast.success("Availability record created");
        } catch (error) {
            console.log("Create availability error");
            toast.error("Avail cannot be created");
        }
    }
}
*/
export const checkAvailability = async(availabilityValue)=>{
    let result = null;
    try {
        const response = await apiConnector("POST",CHECKAVAILABILITY_API,{
            availabilityValue,
        },null);
        console.log("Check Availability");
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data;
        console.log("result is");
    } catch (error) {
        console.log("Error in gettting data",error);
        toast.error("Something wrong");
    }
    return result;

}