import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Order } from './Order'
import '../../App.css'

export const UserDashboard = () => {
    const navigate=useNavigate();
    const onClick=()=>{
        navigate('/maps')
    }
  return (
    <Wrapper>
     
      <h1>      Analytics</h1>
    
        <div className="dashboard">
        <div className='details'>
            <button className='Donate-button' onClick={onClick}>Donate Excess food</button>
        </div>
        <div className="orders">
        <div className='order'>
            <p>Your upcoming Order</p>
            <Order/>
        </div>
        <div>
            <p>Your past Orders</p>
            <Order/>
            <Order/>
            <Order/>
        </div>
        </div>
        </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
`