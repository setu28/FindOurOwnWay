const SubTopic = require('../models/SubTopic');
const Topic = require("../models/Topic");
//const SubTopic = require("../models/SubTopic");
const RelatedTopic = require("../models/RelatedTopic");
const mongoose = require("mongoose");


exports.createRoadMapRelatedTopic = async (req, res) => {  
    try {
        const{
            RelatedTopicName,
            SubTopicAssociatedId,
         }=req.body.data;
    
        //console.log("we are inside createRoadMapSubTopic", typeof topicAssociatedId);
        console.log("We are inside related topic create function");
         if(!RelatedTopicName || !SubTopicAssociatedId){
             return res.status(500).json({
                 success: false,
                 message: "Please fill all the required information in related topic",
             });
        }
        const SubTopicObjectId = new mongoose.Types.ObjectId(SubTopicAssociatedId);
        
        const SubtopicAssociatedModel = await SubTopic.findOne({_id: SubTopicObjectId});
        if(!SubtopicAssociatedModel){
            return res.status(500).json({
                success: false,
                message: "Sub Topic not found",
            });
        }
        //await SubTopic.deleteMany({});

        
        const relatedTopic = await RelatedTopic.create({
             name: RelatedTopicName,
             subTopicsAssociated: SubtopicAssociatedModel._id,
        }); 
        if(relatedTopic){
            const updatedSubTopic =  await SubTopic.findByIdAndUpdate(SubTopicObjectId,{relatedTopicAssociated: relatedTopic._id}); 
            //topicsAssociatedModel.subTopics.push(subTopic._id);
            //await topicsAssociatedModel.save();
            console.log("Coming inside updating related topic to sub topic");
        }
        
        return res.status(200).json({
            success: true,
            message: "RoadMap RelatedTopic record created successfully",
            relatedTopic,
        });     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create RoadMap Related Sub Topic record",
            error: error.message,
        });
    }
   
}

exports.updateRoadMapRelatedTopicsById = async (req, res) => {
    try {
        const{
            RelatedTopicName,
            id,
         }=req.body.data;
        if(!RelatedTopicName || !id){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required information",
            });
        }
        //const roadMapSubjectAssociatedValue = await RoadMapSubject.findOne({name: RoadMapNameValue});
        const relatedTopic = await RelatedTopic.findByIdAndUpdate(
            id,
            {
                name: RelatedTopicName,
            },
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "RoadMap Related Topic record updated successfully",
            relatedTopic,
        });     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update RoadMap Related Topic record",
            error: error.message,
        });
    }
}