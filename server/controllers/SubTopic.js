const SubTopic = require('../models/SubTopic');
const Topic = require("../models/Topic");
const mongoose = require("mongoose");

exports.createRoadMapSubTopic = async (req, res) => {  
    try {
        const{
            SubTopicName,
            topicAssociatedId,
         }=req.body.data;
    
        console.log("we are inside createRoadMapSubTopic", typeof topicAssociatedId);
         if(!SubTopicName || !topicAssociatedId){
             return res.status(500).json({
                 success: false,
                 message: "Please fill all the required information",
             });
        }
        const topicObjectId = new mongoose.Types.ObjectId(topicAssociatedId);
        
        const topicsAssociatedModel = await Topic.findOne({_id: topicObjectId});
        if(!topicsAssociatedModel){
            return res.status(500).json({
                success: false,
                message: "Topic not found",
            });
        }
        

        
        const subTopic = await SubTopic.create({
             name: SubTopicName,
             topicsAssociated: topicsAssociatedModel._id,
        }); 
        if(subTopic){
            const updatedTopic =  await Topic.findByIdAndUpdate(topicObjectId,{subTopicsAssociated: subTopic._id}); 
            //topicsAssociatedModel.subTopics.push(subTopic._id);
            //await topicsAssociatedModel.save();
            console.log("Coming inside updating sub topic to topic");
        }
        
        return res.status(200).json({
            success: true,
            message: "RoadMap SubTopic record created successfully",
            subTopic,
        });     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create RoadMap SubTopic record",
            error: error.message,
        });
    }
   
}

exports.updateRoadMapSubTopicsById = async (req, res) => {
    try {
        const{
            SubTopicName,
            id,
         }=req.body.data;
        if(!SubTopicName || !id){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required information",
            });
        }
        const subTopic = await SubTopic.findByIdAndUpdate(
            id,
            {
                name: SubTopicName,
            },
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "RoadMap SubTopic record updated successfully",
            subTopic,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update RoadMap SubTopic record",
            error: error.message,
        });
    }
}