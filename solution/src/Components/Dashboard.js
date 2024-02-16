import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Order } from './userComponents/Order';
import { NgoOrder } from './NgoOrder';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:6005";
const data=require('../order.json');


const Dashboard = () => {
  const [startOrder,setStartOrder]=useState(false);
  const [bookDetail,setBookDetail]=useState({});
  const [orders,setOrders]=useState([]);
  const [completedOrders,setCompletedOrders]=useState([]);
  const [socket,setSocket]=useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}


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
    {startOrder?
    <>
    <NgoOrder bookDetail={bookDetail} type="Ngo" socket={socket}/>
    </>:
    <div style={{textAlign:"center"}}>
        <h1>Dashboard</h1>
       
          <NavLink to={'/addLocation'}>
            <button className="addLocation">Add Location</button>
          </NavLink>
          <h1>Pending Orders</h1>
          {orders.map((ele,index)=>{
              return <Order key={index} type={"NgoTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}
          <h1>completed Orders</h1>
          {completedOrders.map((ele,index)=>{
              return <Order key={index} type={"NgoTracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}


           
    </div>
       }
          
          </> 
    )
}

      

export default Dashboard