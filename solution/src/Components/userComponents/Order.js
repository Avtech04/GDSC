import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export const Order = (props) => {
    const navigate=useNavigate();
    const onClick=()=>{
        if(props.type==="Booking"){
            
            props.setDestCoordinate(props.details.Center);
            props.setBookingState(true);
        }
    }
  return (
    <Wrapper onClick={onClick}>
        <Details>
            <p>ABC NGO FOUNDATION</p>
            <h5>Jaipur,Rajasthan</h5>
        </Details>
        <Contribution>
            <p>Distance: 10km</p>
            <p>5 meal</p>
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