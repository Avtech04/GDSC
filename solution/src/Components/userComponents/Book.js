import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
export const Book = () => {
    const navigate=useNavigate();
    const onClick=()=>{
        navigate('/UserDashboard')
    }
  return (
    <Wrapper>
        <label>Type of Food</label>
        <select name='Type' onChange={(e)=>{alert("yes")}}>
            <option value={"Vegiterian"} onClick={(e)=>{alert(e.value)}}>Veg</option>
            <option value={"Non-vegiterian"} onClick={(e)=>{alert(e.value)}}>Non-veg</option>
        </select>
        <label>Select the Freshness of Food</label>
        <select name='freshness' onChange={(e)=>{alert("yes")}}>
            <option value={"Recently Made"} >Recently</option>
            <option value={"2hour Made"}>2 hr ago</option>
            <option value={"Recently Made"} >4hr ago</option>
            <option value={"2hour Made"} >6hr ago</option>
        </select>
        <label>Select the No. of Meals</label>
        <input type='number' placeholder='minimum 2 meal' min={"2"}></input>
        <button onClick={onClick}>Confirm Booking</button>

    </Wrapper>
  )
}

const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
`