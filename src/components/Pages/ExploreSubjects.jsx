import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import city1 from "../../assets/Images/PujaName.png";
import city2 from "../../assets/Images/PujaName.png";
import city3 from "../../assets/Images/PujaName.png";
import planet1 from "../../assets/Images/PujaName.png";
import planet2 from "../../assets/Images/PujaName.png";
import { useNavigate } from 'react-router-dom';

const ExploreSubjects = () => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);
    const navigate = useNavigate();

  const handleNext = () => {
    console.log("Next");
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    console.log("Back");
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5
      );

      return updatedIndexes;
    });
  };

  const images = [city1, city2, city3, planet1, planet2];

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };
  const handleExploreRoadMaps = ()=>{
    navigate("/viewRoadMaps");
  }

  return (
    <div className="flex flex-col">

        <div 
            onClick={handleExploreRoadMaps}
            className="flex flex-col items-center justify-center">
            <button className="rounded-[12px] border border-richblack-700 bg-Orange-400 px-[12px] py-[6px] text-richblack-500">
                            Explore More RoadMaps
            </button>
        </div>
        <div className="py-4">
            <div className="flex items-center flex-col justify-center bg-pure-greys-50 h-80">
                {images.map((image, index) => (
                        <motion.img
                            key={index}
                            src={image}
                            alt={image}
                            className="rounded-[12px]"
                            initial="center"
                            animate={positions[positionIndexes[index]]}
                            variants={imageVariants}
                            transition={{ duration: 0.5 }}
                            style={{ width: "20%", position: "absolute" }}
                        />
                ))}   
            </div>
            
        </div>
        <div>
            <div className="flex flex-col items-center justify-center h-50">
                <div className="flex flex-row gap-1">
                
                    <button
                        className="text-orange mt-[5px] bg-Orange-400 rounded-md py-2 px-4"
                        onClick={handleBack}
                    >
                    Back
                    </button>
                    <button
                        className="text-white mt-[5px] bg-Orange-400 rounded-md py-2 px-4"
                        onClick={handleNext}
                    >
                    Next
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExploreSubjects