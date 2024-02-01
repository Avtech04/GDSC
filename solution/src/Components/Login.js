import React, { useEffect, useState,useContext } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from '../UserContext';
const Login = () => {
    const history=useNavigate();
    const { userEmail, setUserEmail } = useContext(UserContext);
    const { latitude, setLatitude } = useContext(UserContext);
    const { longitude, setLongitude } = useContext(UserContext);
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:6005/login",{
                email,password
            })
            .then(res=>{
                
                if(res.data.message=="exist"){
                    console.log(res.data.user);
                    setUserEmail(res.data.user.email);
                    setLatitude(res.data.user.latitude);
                    setLongitude(res.data.user.longitude);
                    history("/userdashboard",{state:{id:email}})
                }
                else if(res.data.message=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    const loginwithgoogle = ()=>{
        window.open("http://localhost:6005/auth/google/callback","_self")
    }
  return (
    <>
        <div className="login-page">
            <h1 style={{textAlign:"center"}}>Login for Doners</h1>
            <div className="form">
            <form action="POST">
              
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>
            <Link to="/signup">Signup Page</Link>
                <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google for NGO
                </button>
            </div>
        </div>
    </>
  )
}

export default Login