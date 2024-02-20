import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { haversine_distance } from '../haversine_distance';
import { Appstate } from '../../contextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Book = (props) => {
  const navigate = useNavigate();
  const { userEmail } = Appstate();
  const [distance, setDistance] = useState();
  const [type, setType] = useState('');
  const [freshness, setFreshness] = useState('');
  const [quantity, setQuantity] = useState('');
  useEffect(() => {
    let dis = haversine_distance(props.userCoordinate, props.bookDetail.coordinates);
    setDistance(dis);
  }, [props.bookDetail])

  async function submit(e) {
    e.preventDefault();
    console.log(props);
    console.log(userEmail);
    if (props.userCoordinate && props.userCoordinate.length > 0) {
      const userCoordinate = props.userCoordinate;
      console.log(props.bookDetail);
      const NgoId = props.bookDetail.NgoId;
      const LocationId = props.bookDetail._id;
      console.log(LocationId);
      try {
        await axios.post('http://localhost:6005/maps', {
          type,
          freshness,
          quantity,
          userCoordinate,
          NgoId,
          LocationId,
          userAddress: props.userAddress,
          distance,
          userEmail,// Add the user's email to the request payload

        })
        console.log("Order Successful")
        toast.success("order successful!");
        setTimeout(() => {
          navigate("/userdashboard");
        }, 2000);

      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Wrapper>
      <ToastContainer />


      <div className="login-page" style={{
        "margin-left": "5vw",
      }}>

        <div className="form">
          <h1 style={{ textAlign: "center" }}>Complete the details for the order!</h1>
          <form action="POST">
            <input type="text" onChange={(e) => { setType(e.target.value); }} placeholder="Type of food" /><br></br>
            <input type="text" onChange={(e) => { setFreshness(e.target.value); }} placeholder="Select the Freshness of Food" /><br></br>
            <input type="number" onChange={(e) => { setQuantity(e.target.value); }} placeholder="Quantity" /><br></br>
            <input type="submit" placeholder='Confirm order' onClick={submit} className='btn2' style={{
              background: "blue",
              "font-size": "18px",
            }} />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`;