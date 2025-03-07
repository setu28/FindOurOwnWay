const Topic = require('../models/Topic');
const RoadMapSubject = require('../models/RoadmapSubject');


exports.createRoadMapTopic = async (req, res) => {
    try {
        const{
            TopicName,
            RoadMapNameValue,
         }=req.body.data;
         console.log("we are inside createRoadMaptopoc");
         
        if(!TopicName || !RoadMapNameValue){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required information",
            });
        }
        const roadMapSubjectAssociatedValue = await RoadMapSubject.findOne({name: RoadMapNameValue});
        
        const topic = await Topic.create({
            name: TopicName,
            roadMapSubjectAssociated: roadMapSubjectAssociatedValue._id,
        }); 
        
        return res.status(200).json({
            success: true,
            message: "RoadMap Topic record created successfully",
            topic,
        });     
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success: false,
            message: "Unable to create RoadMap Topic record",
            error: error.message,
        });
    }
}

exports.updateRoadMapTopicById = async (req, res) => {
    try {
        const{
            TopicName,
            id,
         }=req.body.data;
        if(!TopicName || !id){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required information",
            });
        }
        //const roadMapSubjectAssociatedValue = await RoadMapSubject.findOne({name: RoadMapNameValue});
        const topic = await Topic.findByIdAndUpdate(
            id,
            {
                name: TopicName,
            },
            {new: true}
        );
        
        
       
        
        return res.status(200).json({
            success: true,
            message: "RoadMap Topic record updated successfully",
            topic,
        });     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update RoadMap Topic record",
            error: error.message,
        });
    }
}
