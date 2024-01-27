import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
const Dashboard = () => {

  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}


useEffect(() => {
  //getUser()
}, [])
  return (
    <div style={{textAlign:"center"}}>
        <h1>Dashboard</h1>
       
          <NavLink to={'/addLocation'}>
            <button className="addLocation">Add Location</button>
          </NavLink>
           
        </div>
       
          
        
    )
}

      

export default Dashboard