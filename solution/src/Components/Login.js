// import React, { useState } from "react";
// import "./login.css";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//     const history = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     async function submit(e) {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:6005/login", { email, password });
//             if (res.data.message === "exist") {
//                 toast.success("Login successful!"); // Trigger toast notification on successful login
//                 setTimeout(() => {
//                     history("/userdashboard", { state: { id: email } });
//                 }, 2000); // Delay navigation by 2 seconds (adjust as needed)
//             } else if (res.data.message === "notexist") {
//                 alert("User has not signed up.");
//             }
//         } catch (error) {
//             console.log("Error:", error);
//             alert("An error occurred. Please try again.");
//         }
//     }

//     const loginWithGoogle = () => {
//         window.open("http://localhost:6005/auth/google/callback", "_self");
//     }

//     return (
//         <>
//             <div className="login-page">
//                 <div className="form">
//                     <h1 style={{textAlign: "center"}}>Login for Donors</h1>
//                     <form onSubmit={submit}>
//                         <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//                         <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//                         <button type="submit">Login</button>
//                     </form>
//                     <ToastContainer /> {/* Ensure ToastContainer is rendered */}
//                     <Link to="/signup">Signup Page</Link>
//                     <button className="login-with-google-btn" onClick={loginWithGoogle}>
//                         Sign In With Google for NGO
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;




import React, {  useState,useContext } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Appstate } from "../contextApi";
const Login = () => {
    // const notify = () => toast("Wow so easy!");
    const history=useNavigate();
    //const { userEmail, setUserEmail } = useContext(UserContext);
    const {setUserEmail} = Appstate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        // const notify = () => toast("Wow so easy!");
        e.preventDefault();

        try{

            await axios.post("http://localhost:6005/login",{
                email,password
            })
            .then(res=>{
                
                if(res.data.message==="exist"){
                    setUserEmail(res.data.user.email);
                    toast.success("Login successful!"); // Trigger toast notification on successful login
                                  setTimeout(() => {
                                      history("/userdashboard", { state: { id: email } });
                                  }, 2000);
                   
                    
                    
                    
                   
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
        <ToastContainer />
            <div className="form">
            <h1 style={{textAlign:"center"}}>Login for Doners</h1>
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