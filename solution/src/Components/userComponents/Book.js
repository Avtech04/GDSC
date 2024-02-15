import React, {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { haversine_distance } from '../haversine_distance';
import { Appstate } from '../../contextApi';

export const Book = (props) => {
  const navigate = useNavigate();
  const { userEmail } = Appstate();
  const [distance,setDistance]=useState();
  const [type, setType] = useState('');
  const [freshness, setFreshness] = useState('');
  const [quantity, setQuantity] = useState('');
  useEffect(()=>{
    let dis=haversine_distance(props.userCoordinate,props.bookDetail.coordinates);
    setDistance(dis);
  },[props.bookDetail])

  async function submit(e) {
    e.preventDefault();
    console.log(props);
    if(props.userCoordinate&&props.userCoordinate.length>0){
      const userCoordinate=props.userCoordinate;
      console.log(props.bookDetail);
      const NgoId=props.bookDetail.NgoId;
      const LocationId=props.bookDetail._id;
      console.log(LocationId);
    try {
      await axios.post('http://localhost:6005/maps', {
        type,
        freshness,
        quantity,
        userCoordinate,
        NgoId,
        LocationId,
        userAddress:props.userAddress,
        distance,
        userEmail:"123@123",// Add the user's email to the request payload

      })
      navigate('/userDashBoard');
      
    } catch (e) {
      console.log(e);
    }
  }
  }

  return (
    <Wrapper>
      <form action="POST">
        <input type="text" onChange={(e) => { setType(e.target.value); }} placeholder="type" />
        <input type="text" onChange={(e) => { setFreshness(e.target.value); }} placeholder="Select the Freshness of Food" />
        <input type="number" onChange={(e) => { setQuantity(e.target.value); }} placeholder="quantity" />
        <input type="submit" onClick={submit} />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`;