import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { updateRoadMapSubjectEndpoints } from "../apis";

const { 
    UpdateRoadMapSubjectTopic_Creation_API,
    UpdateRoadMapSubjectSubTopic_Creation_API,
    UpdateRoadMapSubjectRelatedTopic_Creation_API,
}=updateRoadMapSubjectEndpoints

export const updateRoadMapTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("We are in updateRoadMapTopic",data);
        const response = await apiConnector("POST", UpdateRoadMapSubjectTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Topic Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.topic;
        console.log("result",result);
    } catch (error) {
        toast.error(error.message);
        console.log("error",error);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateRoadMapSubTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("We are in updateRoadMapTopic",data);
        const response = await apiConnector("POST", UpdateRoadMapSubjectSubTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Topic Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.subTopic;
        console.log("result",result);
    } catch (error) {
        toast.error(error.message);
        console.log("error",error);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateRoadMapRelatedTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("We are in updateRoadMapTopic",data);
        const response = await apiConnector("POST", UpdateRoadMapSubjectRelatedTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Topic Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.relatedTopic;
        console.log("result",result);
    } catch (error) {
        toast.error(error.message);
        console.log("error",error);
    }
    toast.dismiss(toastId);
    return result;
}

