const BASE_URL = process.env.REACT_APP_BASE_URL

//auth Endpoints
export const endpoints = {
    LOGINPandit_API : BASE_URL + "/auth/login/pandit",
    LOGINCustomer_API : BASE_URL + "/auth/login/customer",
    LOGINAdmin_API : BASE_URL + "/auth/login/admin",
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    VERIFYOTP_API : BASE_URL + "/auth/verify-otp",
    User_Creation_API : BASE_URL + "/auth/signup/user",
    Student_Creation_API : BASE_URL + "/auth/signup/student",
    CUSTOMER_CREATION_API : BASE_URL + "/auth/signup/customer",
    Address_Creation_API : BASE_URL + "/auth/signup/address", 
    UpdatePujaNameDetailsToPanditProfile_API : BASE_URL + "/auth/signup/pandit/updatePujaNames",
}

export const roadMapSubjectEndpoints = {
    RoadMapSubject_Creation_API : BASE_URL + "/roadMapSubject/createRoadMapSubject",
    RoadMapSubjectSubTopic_Creation_API : BASE_URL + "/roadMapSubject/createRoadMapSubTopic",
    RoadMapSubjectRelatedTopic_Creation_API : BASE_URL + "/roadMapSubject/createRoadMapRelatedTopic",
    RoadMapSubjectTopic_Creation_API: BASE_URL + "/roadMapSubject/createRoadMapTopic",
    RoadMapSubjectTopicNickName_Creation_API: BASE_URL + "/roadMapSubject/createRoadMapTopicNickName",
    RoadMapSubjectTopic_Publish_API: BASE_URL + "/roadMapSubject/PublishRoadMap",
}

export const updateRoadMapSubjectEndpoints = {
    UpdateRoadMapSubject_Creation_API : BASE_URL + "/roadMapSubject/updateRoadMapSubject",
    UpdateRoadMapSubjectSubTopic_Creation_API : BASE_URL + "/roadMapSubject/updateRoadMapSubTopic",
    UpdateRoadMapSubjectRelatedTopic_Creation_API : BASE_URL + "/roadMapSubject/updateRoadMapRelatedTopic",
    UpdateRoadMapSubjectTopic_Creation_API : BASE_URL + "/roadMapSubject/updateRoadMapTopic",
}

export const getroadMapSubjectDetails = {
    GETRoadMapSubjectTopic_ALLPUBLISHED_API : BASE_URL + "/roadMapSubject/getAllPublishedRoadMaps",
}


export const panditendpoints = {
    GETALLPANDITS_API : BASE_URL + "/view/findingPanditPage",
    GETPANDITRECORD_API : BASE_URL + "/view/panditRecord",
    GETFILTEREDPANDITS_API : BASE_URL + "/view/findingfilteredPandits",
    GETNONAPPROVEDPANDITSLIST_API : BASE_URL + "/view/findingNonApprovedPandits",
    GETNONAPPROVEDFILTEREDPANDITSLIST_API : BASE_URL + "/view/findingNonApprovedFilteredPandits",
    GETNONAPPROVEDPANDITSCOUNT_API : BASE_URL + "/view/findingCountOfApprovedList",
}

export const adminEndpoints = {
    APPROVEPANDIT_API : BASE_URL + "/admin/approvePandit",
}

export const contactendpoints = {
    CUSTOMERQUERY_API : BASE_URL + "/view/contactUs",
}

export const availabilityendpoints = {
    CREATEAVAILABILITY_API : BASE_URL + "/avail/createAvail",
    CHECKAVAILABILITY_API : BASE_URL + "/avail/checkAvail",
}

export const pujaNameEndpoints = {
    GETPANDITPUJANAMEDETAILS_API : BASE_URL + "/view/viewPanditPujasNamesList",
    GETPUJANAMELIST_API : BASE_URL + "/view/viewPujaNames",
}

