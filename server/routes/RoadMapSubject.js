const express = require("express");
const router = express.Router()
const { createRoadMapTopic,updateRoadMapTopicById } = require("../controllers/Topic")
const{
    createRoadMapSubject,
    publishRoadMap,
    createRoadMapNickName,
    getAllPublishedRoadMaps,
}=require("../controllers/RoadMapSubject")
const { createRoadMapSubTopic,updateRoadMapSubTopicsById} = require("../controllers/SubTopic")
const { createRoadMapRelatedTopic, updateRoadMapRelatedTopicsById } = require("../controllers/RelatedTopic")

router.post("/createRoadMapSubject",createRoadMapSubject);
router.post("/createRoadMapTopic", createRoadMapTopic);
router.post("/createRoadMapSubTopic",createRoadMapSubTopic);
router.post("/createRoadMapRelatedTopic",createRoadMapRelatedTopic);
router.post("/createRoadMapTopicNickName",createRoadMapNickName);
router.post("/PublishRoadMap",publishRoadMap);


//router.post("/updateRoadMapSubject",createRoadMapSubject);
router.post("/updateRoadMapTopic", updateRoadMapTopicById);
router.post("/updateRoadMapSubTopic",updateRoadMapSubTopicsById);
router.post("/updateRoadMapRelatedTopic",updateRoadMapRelatedTopicsById);

//Get all the published RoadMap Details
router.get("/getAllPublishedRoadMaps", getAllPublishedRoadMaps);





module.exports = router;