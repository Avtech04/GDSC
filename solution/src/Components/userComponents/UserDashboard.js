import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Order } from './Order';
import { NgoOrder } from '../NgoOrder';
import axios from 'axios';
import '../../App.css';
import io from 'socket.io-client';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Appstate } from '../../contextApi';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
     

    
        <div style={{textAlign:"center",display:"flex"}}>
       
        <div className='NGO-profile'>
       <h2>Profile</h2>
       <Card className='cardd_dashboard' >
          <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
          <Card.Body className='card_body'>
            <Card.Title className='card_title'>Ayush Ngo</Card.Title>
            <Card.Text className='card_description'>order done : 2</Card.Text>
            
            <Card.Text className='card_description'>order pending : 1</Card.Text>
           
            <Button className="addLocation" onClick={onClick}>Donate Excess food</Button>

          </Card.Body>
        </Card>
      
       </div>
        <div className="orders">
        <div className='orderDetails'>
         <Tabs
      defaultActiveKey="pending"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="completed" title="Pending Orders">
      <h1>Your past Orders</h1>
      {orders.map((ele,index)=>{
              return <Order key={index} type={"UserTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
      </Tab>
      <Tab eventKey="pending" title="Completed Orders">
      <h1>Your Completed Orders</h1>
      {completedOrders.map((ele,index)=>{
              return <Order key={index} type={"UserTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
      </Tab>
      
    </Tabs>
         
         


           
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