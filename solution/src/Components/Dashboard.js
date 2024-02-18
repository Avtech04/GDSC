import axios from 'axios';
import React, { useEffect, useState,CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Order } from './userComponents/Order';
import { NgoOrder } from './NgoOrder';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BounceLoader from "react-spinners/BounceLoader";
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:6005";
const data=require('../order.json');

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };
const Dashboard = () => {
  const [startOrder,setStartOrder]=useState(false);
  const [bookDetail,setBookDetail]=useState({});
  const [orders,setOrders]=useState([]);
  const [completedOrders,setCompletedOrders]=useState([]);
  const [socket,setSocket]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}

useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
      setLoading(false);
  },800)
},[])


useEffect(() => {
  //getUser();
 axios.get('http://localhost:6005/getOrders',
  {
    params:{
      NgoId:'1234'
    }
  }).then((res)=>{
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
    }).catch((e)=>{
      console.log(e);
    })
    setSocket(io(ENDPOINT));setSocket(io(ENDPOINT));
    return ()=>{};
}, [])
  return (
    <>
    {
      loading?
      <BounceLoader
      color="#36d7b7"
      size={100}
      cssOverride={{
        display: 'block',
        margin: '30vh 50%'
      }}
    />
    :<div> {startOrder?
      <>
      <NgoOrder bookDetail={bookDetail} type="Ngo" socket={socket}/>
      </>:
      <div style={{textAlign:"center",display:"flex"}}>
          {/* <h1>Dashboard</h1> */}
         <div className='NGO-profile'>
         <h2>Profile</h2>
         <Card className='cardd_dashboard' >
            <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
            <Card.Body className='card_body'>
              <Card.Title className='card_title'>Doner Ayush</Card.Title>
              <Card.Text className='card_description'>order done : 2</Card.Text>
              
              <Card.Text className='card_description'>order pending : 1</Card.Text>
              <NavLink to={'/addLocation'}>
              <Button className="addLocation">Add Location</Button>
            </NavLink>
            </Card.Body>
          </Card>
        
         </div>
           <div className='orderDetails'>
           <Tabs
        defaultActiveKey="pending"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="completed" title="Completed Orders">
        <h1>Completed Orders</h1>
            {completedOrders.map((ele,index)=>{
                return <Order key={index} type={"NgoTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
              })}
        </Tab>
        <Tab eventKey="pending" title="Pending Orders">
        <h1>Pending Orders</h1>
            {orders.map((ele,index)=>{
                return <Order key={index} type={"NgoTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
              })}
        </Tab>
        
      </Tabs>
           
           
  
  
             
      </div>
      </div>
         }</div>
    }
   
          
          </> 
    )
}

      

export default Dashboard