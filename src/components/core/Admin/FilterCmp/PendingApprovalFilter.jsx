import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaFilter } from "react-icons/fa";
import NonApprovedPanditsDetailsList from '../Pandit/NonApprovedPanditsDetailsList';
import { getNonApprovedPanditList } from '../../../../services/operations/panditDetailsAPI';
import { getNonApprovedFilteredPanditList } from '../../../../services/operations/panditDetailsAPI';
import { Link } from "react-router-dom";


const PendingApprovalFilter = () => {
    const [responsePandits, setResponsePandits] = useState([{}]);
    const [responseUsers, setResponseUsers] = useState([{}]);
    var  i = 0;
    const [location, setLocation] = useState(null);
    const [filtervalue, setFiltervalue] = useState(null);
    const [filter, setfilter] = useState(null);
    const getdata = async()=>{
        try {
            const res = await getNonApprovedPanditList();
            if(res){
                setResponsePandits(res.nonApprovedList);
                setResponseUsers(res.usersList);
            }
        } catch (error) {
            console.log("Error",error);
        }
    }
    const getupdateddata = async()=>{
        try {
            const filteredres = await getNonApprovedFilteredPanditList(filter,filtervalue);
            console.log("We are in getupdated Data ",filter);
            //setResponse(filteredres);
        } catch (error) {
            console.log("Error",error);
        }
    }
    useEffect(()=> {
        getdata();
    },[]);
    useEffect(()=>{
        if(filtervalue){
            getupdateddata();
        }
    },[filtervalue]);
    const handleChange = (e) =>{
        setfilter(e.currentTarget.getAttribute('data-value'));
        setFiltervalue(e.target.innerHTML);
        e.preventDefault();
    }
    
    
    return (
        <div>
            {/*Section 1 */}
            <div className="flex justify-center" key={0}> 
                <div className="py-5">
                    <FaFilter/>
                </div>
                <div className="dropdown dropdown-end" key={1}>
                    <div tabIndex={0} role="button" className="btn m-1">Filter</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li key={2}><a onClick={handleChange}  data-value="Experience">Experience</a></li>
                            <li key={3}><a onClick={handleChange}>Ratings</a></li>
                        </ul>
                    </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Educational Background</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li key={4} value={filtervalue}><a onClick={handleChange} data-value="Educational Background">Test</a></li>
                            <li key={5}><a onClick={handleChange} data-value="Educational Background">Test2</a></li>
                        </ul>
                    </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Expertise</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li key={0}><a onClick={handleChange}>Test1</a></li>
                            <li key={1}><a onClick={handleChange}>Test2</a></li>
                        </ul>
                    </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1" onClick={handleChange}>
                        Available Tommorow 
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-row py-6">
                {responsePandits?.map((data) =>(
                        <NonApprovedPanditsDetailsList
                            number={i++}
                            userdata={responseUsers}
                            details={data}
                            key={data._id}
                        />
                ))}
            </div>

        </div>
    )
}

export default PendingApprovalFilter