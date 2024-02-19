import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import { LocationFinder } from "./LocationFinder";
import { Appstate } from "../contextApi";


const AddLocation = () => {

  const navigate = useNavigate();
  const {NgoUser}=Appstate();
  const [description, setDescription] = useState('')
  const [peoples, setPeoples] = useState('')
  const [address, setAddress] = useState('')
  const [coordinate, setCoordinate] = useState([]);
  const ngoName=NgoUser.displayName;
  const lng=coordinate[0];
  const lat=coordinate[1];
  const submit=async(e)=>{
    e.preventDefault();
    await axios.post('http://localhost:6005/AddLocation', {
    ngoName,
    description,
    peoples,
    address,
    NgoId:NgoUser.googleId,
    lng,
    lat
    });
    navigate('/dashboard'); 

  }

  return (
    <>
    
            
            <div className="form">
            <h1 style={{textAlign:"center"}}>Add Location</h1>
            {/* <form action="POST"> */}
              
            <input type="text" value={NgoUser.displayName} placeholder="Name of Organisation" />
        <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="description" />
        <input type="number" onChange={(e) => { setPeoples(e.target.value) }} placeholder="number of peoples" />
        <LocationFinder setAddress={setAddress} setCoordinate={setCoordinate} />
        <button onClick={submit}>Submit</button> 

    
            </div>
    </>
  );
};

export default AddLocation;
