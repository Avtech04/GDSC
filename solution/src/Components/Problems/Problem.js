import React, { useEffect, useRef, useState } from "react";
import "../componentsCSS/login.css";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Create = () => {
  const history = useNavigate();
  const fileref = useRef();
  const [headline, setHeadline] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('');

  const onassign = (e) => {
    e.preventDefault();
    fileref.current.click();
  }

  async function submit(e) {
    e.preventDefault();
    alert("function called");

    const data1 = new FormData();
    data1.append("headline", headline);
    data1.append("description", description);
    data1.append("file", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      (axios.post(`http://localhost:6005/createProblem`, data1, config))
        .then(res => {
          console.log(res);
          if (res.data == "notexist") {
            console.log("nhi ho rha yr");
            toast.success("Created") // Trigger toast notification on successful login
            setTimeout(() => {
              history("/admin/dashboard", { state: { id: headline } })
            }, 2000);

          }
          else if (res.data === "exist") {
            console.log("ho rha yr");
            alert("User already exists")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })

    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div className="login-page">

      <div className="form">
        <h1 style={{ textAlign: "center" }}>Create Problem</h1>
        <ToastContainer />
        <form >

          <input type="text" onChange={(e) => { setHeadline(e.target.value) }} placeholder="Headline" />
          <textarea style={{
            height: '20vh',
            outline: 'none',
            width: '21vw', padding: '12px',
          }} onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" />

          <button onClick={(e) => { onassign(e) }}>Select Image</button>
          <input type='file' ref={fileref} name='myfile' style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />
          <input type="submit" onClick={submit} />

        </form>


      </div>
    </div>

  );
};

export default Create;
