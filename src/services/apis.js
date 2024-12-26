const BASE_URL = process.env.REACT_APP_BASE_URL

//auth Endpoints
export const endpoints = {
    LOGINPandit_API : BASE_URL + "/auth/login/pandit",
    LOGINCustomer_API : BASE_URL + "/auth/login/customer",
    LOGINAdmin_API : BASE_URL + "/auth/login/admin",
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    VERIFYOTP_API : BASE_URL + "/auth/verify-otp",
    USER_CREATION_API : BASE_URL + "/auth/signup",
    PANDIT_CREATION_API : BASE_URL + "/auth/signup/pandit",
    CUSTOMER_CREATION_API : BASE_URL + "/auth/signup/customer",
    ADDRESS_CREATION_API : BASE_URL + "/auth/signup/address", 
    UpdatePujaNameDetailsToPanditProfile_API : BASE_URL + "/auth/signup/pandit/updatePujaNames",
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

