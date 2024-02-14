import React, { useEffect, useState } from 'react'
import "./header.css"
import { NavLink } from "react-router-dom"
import axios from "axios"

const Headers = () => {
    
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    // logout
    const logout = ()=>{
        window.open("http://localhost:6005/logout","_self")
    }

    useEffect(() => {
        getUser()
    }, [])

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
      useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
    return (
        <>
         <div id="google_translate_element"></div>
            <header>
                <nav>
                    <div className="left">
                        <h1>Solution Challenge</h1>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                            </li>

                            {/*just for demo */}
                            <li>
                                <NavLink to="/userDashboard">
                                    Donate
                                </NavLink>
                            </li>
                            {
                                Object?.keys(userdata)?.length > 0 ? (
                                    <>
                                    <li style={{color:"black",fontWeight:"bold"}}>{userdata?.displayName}</li>
                                        <li>
                                            <NavLink to="/dashboard">
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li onClick={logout}>Logout</li>
                                        <li>
                                            <img src={userdata?.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
                                        </li>
                                    </>
                                ) : <li>
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            }



                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Headers