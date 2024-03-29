import React, { useEffect, useState } from 'react'

import { NavLink } from "react-router-dom"
import axios from "axios"
import { Appstate } from '../../contextApi'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../componentsCSS/header.css"

const Headers = () => {

    const [userdata, setUserdata] = useState({});
    const { setNgoUser } = Appstate();

    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

            setUserdata(response.data.user);
            setNgoUser(response.data.user);
        } catch (error) {
            console.log("error", error)
        }
    }

    // logout
    const logout = () => {
        window.open("http://localhost:6005/logout", "_self")
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>

            <Navbar className='virtual_header' bg="dark" data-bs-theme="dark"  >
                <div id="google_translate_element"></div>
                <Container>
                    <Navbar.Brand href="#home">HarmonyHive</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <Nav.Link href="/features" >Features</Nav.Link>
                        <Nav.Link href="/login" style={{ width: '100px', }}>Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

export default Headers