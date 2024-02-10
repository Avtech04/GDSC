import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Order } from './Order';
import { NgoOrder } from '../NgoOrder';

import '../../App.css'
const data=require('../../order.json');

export const UserDashboard = () => {
    const navigate=useNavigate();
    const [startOrder,setStartOrder]=useState(false);
    const [bookDetail,setBookDetail]=useState({});
    const onClick=()=>{
        navigate('/maps')
    }
  return (
    <Wrapper>
        {startOrder?<>
            <NgoOrder bookDetail={bookDetail} />
        </>:
        <>
     
      <h1>      Analytics</h1>
    
        <div className="dashboard">
        <div className='details'>
            <button className='Donate-button' onClick={onClick}>Donate Excess food</button>
        </div>
        <div className="orders">
        <div className='order'>
            <p>Your upcoming Order</p>
            {data.order.map((ele,index)=>{
              return <Order key={index} type={"Tracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
            </div>
        <div>
            <p>Your past Orders</p>
            
            {data.order.map((ele,index)=>{
              return <Order key={index} type={"Tracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
            </div>
            </div>
            </div>
            </>
}
    </Wrapper>
  )
}

const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
`