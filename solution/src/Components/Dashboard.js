import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Order } from './userComponents/Order';
import { NgoOrder } from './NgoOrder';
const data=require('../order.json');


const Dashboard = () => {
  const [startOrder,setStartOrder]=useState(false);
  const [bookDetail,setBookDetail]=useState({});
  const [orders,setOrders]=useState([]);
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
      console.log(res);
      setOrders(res.data);
    }).catch((e)=>{
      console.log(e);
    })
    return ()=>{};
}, [])
  return (
    <>
    {startOrder?
    <>
    <NgoOrder bookDetail={bookDetail} />
    </>:
    <div style={{textAlign:"center"}}>
        <h1>Dashboard</h1>
       
          <NavLink to={'/addLocation'}>
            <button className="addLocation">Add Location</button>
          </NavLink>
          {orders.map((ele,index)=>{
              return <Order key={index} type={"Tracking"}  setDestCoordinate={()=>{}} setBookingState={()=>{}} setStartOrder={setStartOrder} setBookDetail={setBookDetail} details={ele}/>
            })}

           
    </div>
       }
          
          </> 
    )
}

      

export default Dashboard