import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { haversine_distance } from '../haversine_distance';
import styled from 'styled-components';
import axios from 'axios';

export const Order = (props) => {
    const navigate=useNavigate();
    const [name,setName]=useState();
    const [address,setAddress]=useState();
    const [distance,setDistance]=useState();
    const [person,setPerson]=useState();
    const locationData=async()=>{
        
        let data = await axios.get('http://localhost:6005/getLocation',
        {
          params: {
            id: props.details.LocationId
          }
        });
        setName(data.data[0].ngoName);
        setAddress(data.data[0].address);

    }
    useEffect(()=>{
        if(props.type==="Booking"){
            setName(props.details.ngoName);
            setAddress(props.details.address);
            setPerson(props.details.peoples);
            const dist=haversine_distance(props.userCoordinate,props.details.coordinates);
            setDistance(dist);
        }else if(props.type==="UserTracking"){
           locationData();
           setDistance(props.details.distance);
           setPerson(props.details.quantity);
        }else{
            setName(props.details.order_email);
            setAddress(props.details.userAddress);
            setPerson(props.details.quantity);
            setDistance(props.details.distance);
        }
    },[props.details])
    const onClick=()=>{
        if(props.type==="Booking"){
            props.setBookDetail(props.details);
            props.setDestCoordinate(props.details.coordinates);
            props.setBookingState(true);
        }else{
            props.setBookDetail(props.details)
            props.setStartOrder(true);
            
        }
    }
  return (
    <Wrapper onClick={onClick}>
        <Details>
            <p>{name}</p>
            <h5>{address}</h5>
        </Details>
        <Contribution>
            <p>Distance:{distance}km</p>
            <p>{person}meal</p>
        </Contribution>
    </Wrapper>
  )
}

const Wrapper=styled.div`
 display:flex;
 flex-direction:row;
 background:#000000;
 color:#ffffff;
 height:fit-content;
 margin:10px;
 padding:10px;
 border-radius:10px;
`;
const Details=styled.div`
 flex:2;
 padding:10px;
 
`
const Contribution=styled.div`
    flex:1;
`