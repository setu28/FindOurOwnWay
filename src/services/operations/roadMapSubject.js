import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { roadMapSubjectEndpoints,getroadMapSubjectDetails } from "../apis";


const {
    RoadMapSubject_Creation_API,
    RoadMapSubjectSubTopic_Creation_API,
    RoadMapSubjectTopic_Creation_API,
    RoadMapSubjectRelatedTopic_Creation_API,
    RoadMapSubjectTopicNickName_Creation_API,
    RoadMapSubjectTopic_Publish_API,
} = roadMapSubjectEndpoints

const {
    GETRoadMapSubjectTopic_ALLPUBLISHED_API,
} = getroadMapSubjectDetails


    
export const createRoadMapSubject = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", RoadMapSubject_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Subject Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.roadMapSubject;
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const createRoadMapSubTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", RoadMapSubjectSubTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Topic Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.subTopic;
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const createRoadMapTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("we are inside createRoadMap Related Topic");
        const response = await apiConnector("POST", RoadMapSubjectTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Topic Created Successfully");
        console.log("inside create Roadmap",response);
        result=response?.data.topic;
        console.log("inside create Roadmap",result);
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const createRoadMapRelatedTopic = async (data) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", RoadMapSubjectRelatedTopic_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap Related Topic Created Successfully");
        console.log("inside create Related Topic Roadmap",response);
        result=response?.data.relatedTopic;
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createNickName = async(data) =>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("We are in updateRoadMapTopic",data);
        const response = await apiConnector("POST", RoadMapSubjectTopicNickName_Creation_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Nick Name Updated");
        console.log("inside create Roadmap",response);
        result=response?.data;
        console.log("result",result);
    } catch (error) {
        toast.error(error.message);
        console.log("error",error);
    }
    toast.dismiss(toastId);
    return result;
}

export const publishRoadMap = async(data)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        console.log("We are in publish RoadMap",data);
        const response = await apiConnector("POST", RoadMapSubjectTopic_Publish_API, { data });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("RoadMap is Published");
        console.log("inside create Roadmap",response);
        result=response?.data;
        console.log("result",result);
    } catch (error) {
        toast.error(error.message);
        console.log("error",error);
    }
    toast.dismiss(toastId);
    return result;

}

export const getALLPublishedRoadMap = async() =>{
    const toastId = toast.loading("Retrieving data ")
    let result = null;
    try {
        const response = await apiConnector("GET", GETRoadMapSubjectTopic_ALLPUBLISHED_API, {});
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Able to Retrieve Data");
        console.log("inside create Roadmap",response);
        result=response?.data.roadMapSubject;
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}



