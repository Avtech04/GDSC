import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    
    const history=useNavigate();

    const notify = () => toast("Wow so easy!");
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
   
    async function submit(e){
        e.preventDefault();
     
        try{

            await axios.post("http://localhost:6005/admin",{
                username,password
            })
            .then(res=>{
                console.log(res);
                notify();
                if(res.data=="exist"){
                    
                    history("/admin/dashboard",{state:{id:username}})
                    
                }
                else if(res.data=="notexist"){
                    alert("wrong")
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
            <h1 style={{textAlign:"center"}}>Login for Admin</h1>
            <ToastContainer />
            <form action="POST">
              
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="username"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>
            
            </div>
        </div>
    )
}

export default Login