import React, { useEffect, useState } from "react"
import axios from "axios"
import "./login.css"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:6005/signup",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:email}})
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


    return (
        <div className="login-page">

<div className="form">
            <h1 style={{textAlign:"center"}}>Signup for Doners</h1>
            <form action="POST">
              
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>
            <Link to="/login">Login Page</Link>
               
            </div>
        </div>
    )
}

export default Login