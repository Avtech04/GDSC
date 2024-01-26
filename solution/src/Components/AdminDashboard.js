import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
import Problem from "./Problem";
import { Link, NavLink } from 'react-router-dom';
function Home (){
    const location=useLocation()

    return (
       
        <div className="homepage">

            <h1>Hello {location.state.id} and welcome to the home</h1>
            <NavLink to={'/createProblem'}>
          
          <button className="donate">Donate</button>
          </NavLink>
           
        </div>
       
          
        
    )
}

export default Home