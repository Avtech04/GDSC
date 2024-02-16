import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Order } from './Order';
import { NgoOrder } from '../NgoOrder';
import axios from 'axios';
import '../../App.css';
import io from 'socket.io-client';
import { Appstate } from '../../contextApi';
const ENDPOINT = "http://localhost:6005";




const data = require('../../order.json');



export const UserDashboard = () => {


  const {userEmail}=Appstate();
  const navigate = useNavigate();
  const [startOrder, setStartOrder] = useState(false);
  const [bookDetail, setBookDetail] = useState({});
  const [socket,setSocket]=useState(null);
  const [orders, setOrders] = useState([]);
  const [completedOrders,setCompletedOrders]=useState([]);
  const onClick = () => {
    navigate('/maps')
  }
  useEffect( () => {
    //get the orders related to user(current+previous)
     axios.get('http://localhost:6005/getOrders',
      {
        params: {
          emailId: userEmail,
        }
      }).then((res) => {
        console.log(res);
        let arr1=[];
        let arr2=[];
        res.data.forEach((ele) => {
          if(!ele.status){
            arr1.push(ele);
          }else{
            arr2.push(ele);
          }
        });
        setOrders(arr1);
        setCompletedOrders(arr2);
      }).catch((e) => {
        console.log(e);
      })
      setSocket(io(ENDPOINT));
  }, []);
  return (
    <Wrapper>
      {startOrder ? <>
        <NgoOrder bookDetail={bookDetail} socket={socket} type="User"/>
      </> :
        <>
     
      <h1>      Analytics</h1>
    
        <div className="dashboard">
        <div className='details'>
        <div className='Back-details'>
          <img src="https://picsum.photos/1800/300" className='Back-img'></img>
        </div>
            <button className='Donate-button' onClick={onClick}>Donate Excess food</button>
        </div>
        <div className="orders">
        <div className='order'>
            <p>Your upcoming Order</p>
            {orders.map((ele,index)=>{
              return <Order key={index} type={"UserTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
            </div>
        <div>
            <p>Your past Orders</p>
            
            {completedOrders.map((ele,index)=>{
              return <Order key={index} type={"UserTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
            </div>
            </div>
          </div>
        </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`