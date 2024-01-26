import React, { useEffect,useState } from "react";
import "./login.css";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
const Login = () => {
  
  
  const history=useNavigate();

    const [locality,setLocality]=useState('')
    const [description,setDescription]=useState('')
    const [peoples,setPeoples]=useState('')
    const [city,setCity]=useState('')
    const [longitude,setLongitude]=useState('')
    const [latitude,setLatitude]=useState('')
    // const [file, setFile] = useState();
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:6005/AddLocation",{
                locality,description,peoples,city,longitude,latitude
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:locality}})
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
        <h1 style={{ textAlign: "center" }}>Add Location</h1>
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
                <input type="text" onChange={(e) => { setLocality(e.target.value) }} placeholder="locality"  />
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="description" />
                <input type="number" onChange={(e) => { setPeoples(e.target.value) }} placeholder="number of peoples" />
                <input type="text" onChange={(e) => { setCity(e.target.value) }} placeholder="city" />
                <input type="number" onChange={(e) => { setLongitude(e.target.value) }} placeholder="longitude" />
                <input type="number" onChange={(e) => { setLatitude(e.target.value) }} placeholder="latitude" />
                <input type="submit" onClick={submit} />

            </form>
        </div>
      {/* </div> */}
    </>
  );
};

export default Login;
