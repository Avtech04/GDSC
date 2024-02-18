import React, { useEffect,useState } from "react";
import "./login.css";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Create = () => {
    const history=useNavigate();
    const [headline,setHeadline]=useState('')
    const [description,setDescription]=useState('')
    // const [file, setFile] = useState();
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:6005/createProblem",{
                headline,description
            })
            .then(res=>{
                if(res.data=="notexist"){
                    console.log("nhi ho rha yr");
                   toast.success("Created") // Trigger toast notification on successful login
                    setTimeout(() => {
                        history("/admin/dashboard",{state:{id:headline}})
                    }, 2000);

                }
                else if(res.data==="exist"){
                    console.log("ho rha yr");
                    alert("User already exists")
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
    // function handleChange(e) {
    //   console.log(e.target.files);
    //   setFile(URL.createObjectURL(e.target.files[0]));
    // }

  return (
 
     <div className="login-page">
   
<div className="form">
            <h1 style={{textAlign:"center"}}>Create Problem</h1>
            <ToastContainer />
            <form action="POST">
              
                <input type="text" onChange={(e) => { setHeadline(e.target.value) }} placeholder="Headline"  />
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Description"  />
                <input type="submit" onClick={submit} />

            </form>
           
               
            </div>
        </div>

  );
};

export default Create;
