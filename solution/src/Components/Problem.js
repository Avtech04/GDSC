import React, { useEffect,useState } from "react";
import "./login.css";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
const Login = () => {
  
  
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
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:headline}})
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
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Create Problem</h1>
        {/* <div className="form">
          <form className="login-form">
            <input type="text" name="headline" id="" placeholder="headline" />
            <input
              type="text"
              name="descrpition"
              id=""
              placeholder="descrpition"
            />
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
            <button>Login</button>
          </form> */}
          <form action="POST">
                <input type="text" onChange={(e) => { setHeadline(e.target.value) }} placeholder="headline"  />
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="description" />
                <input type="submit" onClick={submit} />

            </form>
        </div>
      {/* </div> */}
    </>
  );
};

export default Login;
