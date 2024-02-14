import React, {useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Appstate } from '../../contextApi';

export const Book = (props) => {
  const history = useNavigate();
  const { userEmail } = Appstate();
 
  const [type, setType] = useState('');
  const [freshness, setFreshness] = useState('');
  const [quantity, setQuantity] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log(props);
    if(props.userCoordinate&&props.userCoordinate.length>0){
      const longitude=props.userCoordinate[0];
      const latitude=props.userCoordinate[1];
    try {
      await axios.post('http://localhost:6005/maps', {
        type,
        freshness,
        quantity,
        longitude,
        latitude,
        userEmail, // Add the user's email to the request payload
      })
     
        .then((res) => {
            
            
            alert("working")
          if (res.data === 'exist') {
            
            alert('User already exists');
          } else if (res.data === 'notexist') {
            history('/home', { state: { id: type } });
          }
        })
        .catch((e) => {
          alert('wrong details');
          console.log(e);
        });
    } catch (e) {
        alert('wrong detailssssssssssss');
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