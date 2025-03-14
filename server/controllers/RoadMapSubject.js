const RoadmapSubject = require('../models/RoadmapSubject');
const SubTopic = require('../models/SubTopic');
const Tags = require("../models/Tags");



exports.createRoadMapSubject = async (req, res) => {
    try {
        const {
            Name,
            url,
            RoadmapSubjectValue,
            Duration,
            courseTags,
            mentorAssociated,
            studentsAssociated,
            studentsLiked,
            topicsAssociated,
            SamplePapersAssociated,
        } = req.body.data;
    
        console.log("We are here inside createRoadMap subject", Name);
        
        if (!Name || !RoadmapSubjectValue || !Duration || !courseTags) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required information",
            });
        }
    
        // Process tags concurrently
        const tagsAssociated = await Promise.all(
            courseTags.map(async (tagName) => {
                const existingTag = await Tags.findOne({ name: tagName });
                if (!existingTag) {
                    const newTag = await Tags.create({ name: tagName });
                    return newTag._id;
                }
                return existingTag._id;
            })
        );
    
        // Create the Roadmap Subject
        const roadMapSubject = await RoadmapSubject.create({
            name: Name,
            subjectName: RoadmapSubjectValue,
            duration: Duration,
        });
    
        console.log(roadMapSubject);
    
        // Update tags in the background
        setImmediate(async () => {
            try {
                await RoadmapSubject.findByIdAndUpdate(roadMapSubject._id, {
                    tagsAssociated: tagsAssociated,
                });
            } catch (updateError) {
                console.error("Error updating RoadmapSubject tags:", updateError);
            }
        });
    
        return res.status(200).json({
            success: true,
            message: "RoadMap Subject record created successfully",
            roadMapSubject,
        });
    } catch (error) {
        console.log("We are here inside error", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create RoadMap Subject record",
            error: error.message,
        });
    }
    
};


exports.publishRoadMap= async(req,res) =>{
    try {
        const RoadMapId  = req.body.data;
        console.log("we are insde publish RoadMap Backend",req.body.data);

        if(!RoadMapId){
            return res.status(400).json({
                success: false,
                message: "Please all the required information",
            });
        }
        const updatedRoadMapSubject = await RoadmapSubject.findByIdAndUpdate(
            RoadMapId,
            {
                published: true,
            },
            {new : true}
        );
        return res.status(200).json({
            success: true,
            message: "RoadMap Successfulyy updated",
            updatedRoadMapSubject,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update RoadMap Topic record",
            error: error.message,
        });
        
    }
};


exports.createRoadMapNickName= async(req,res) =>{
    try {
        const {
            RoadMapId,
            NickName,
        } = req.body.data;
        console.log("we are insde create NickName  Backend");
        const existing = await RoadmapSubject.findOne({ nickName: NickName });

        if(!RoadMapId){
            return res.status(400).json({
                success: false,
                message: "Please all the required information",
            });
        }
        if (existing) {
            console.log("Nickname already exists!");
            return res.status(400).json({
                success: false,
                message: "Already taken",
            });
        }

        const updatedRoadMapSubject = await RoadmapSubject.findByIdAndUpdate(
            RoadMapId,
            {
                nickName: NickName,
            },
            {new : true}
        );
        return res.status(200).json({
            success: true,
            message: "RoadMap Successfulyy updated",
            updatedRoadMapSubject,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update RoadMap Topic record",
            error: error.message,
        });
        
    }
}

exports.getAllPublishedRoadMaps = async(req,res) =>{
    try {
        const allPublishedRoadMapData = await RoadmapSubject.find({ published : true});
        return res.status(200).json({
            success: true,
            message: "Able to retreive all data",
            allPublishedRoadMapData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve all the data",
            error: error.message,
        })
    }
}

exports.getRoadMapsByTags = async(req,res)=>{
    try {
        const {
            tagName,
        } = req.body.data;
        const tag = await Tags.findOne({ name: tagName });
        if(!tag){
            return res.status(500).json({
                success: false,
                message: "NoT a relevenat Tag",
            });
        }
        const roadmapSubjects = await RoadmapSubject.find({
            tagsAssociated: tag._id
        });
        if(!roadmapSubjects){
            return res.status(500).json({
                success: false,
                message: "No RoadMapSubjets found with this tag",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Found RoadMaps Associated",
            roadmapSubjects,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve data",
        });
        
    }
}

