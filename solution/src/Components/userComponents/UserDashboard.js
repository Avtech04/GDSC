import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Order } from './Order'

export const UserDashboard = () => {
    const navigate=useNavigate();
    const onClick=()=>{
        navigate('/maps')
    }
  return (
    <Wrapper>
        <div>
            Analytics
        </div>
        <div>
            <button onClick={onClick}>Donate Excess food</button>
        </div>
        <div>
            <p>Your upcoming Order</p>
            <Order/>
        </div>
        <div>
            <p>Your past Orders</p>
            <Order/>
        </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
`