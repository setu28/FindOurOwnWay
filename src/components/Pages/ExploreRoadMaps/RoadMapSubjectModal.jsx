import React from 'react'

export const RoadMapSubjectModal = ({roadMap}) => {
  
  return (
    <div className='flex flex-col'>
      <h1>RoadMap Subject Modal</h1>
      <h2>Name - {roadMap.name}</h2>
      <h2>Subject - {roadMap.subjectName}</h2>
      <h2>Tags: {" "}
        {roadMap.tagsAssociated.slice(0,5).map((tag,index)=>(
          <span key={index} className='mr-2'>
            {}
            {index < Math.min(roadMap.tagsAssociated.length, 5) - 1 ? ", " : ""}

          </span>
        ))}
      </h2>
    </div>
  )
}
