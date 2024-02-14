import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import Headers from './Components/Headers';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import Admin from './Components/Admin';
import AdminDashboard from './Components/AdminDashboard';
import { UserDashboard } from './Components/userComponents/UserDashboard';
import { Map } from './Components/Map';
import "mapbox-gl/dist/mapbox-gl.css";
import Carousel from './Components/Carousel';
import CreateProblem from './Components/Problem';
import AddLocation from './Components/AddLocation';
import P1 from './Problems/P1';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import ProblemPage from './Components/ProblemPage';
import axios from 'axios'; // Import axios for making HTTP requests

import { Appstate } from './contextApi';
function App() {
  const [userEmail, setUserEmail] = useState("");
  // const [problemHeading, setProblemHeading] = useState("");
  // const [problemDescription, setProblemDescription] = useState("");
  const [problems, setProblems] = useState([]);
  const [NGOs, setNGOs] = useState([]);
  const { problemID } = Appstate();
  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get('/api/problems'); // Adjust the endpoint according to your backend
        console.log('Response data:', response.data); 
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    }

    fetchProblems();
  }, []);

  useEffect(() => {
    async function fetchNGO() {
      try {
        const response = await axios.get('/api/NGO'); // Adjust the endpoint according to your backend
        console.log('Response data:', response.data); 
        setNGOs(response.data);
      } catch (error) {
        console.error('Error fetching NGO:', error);
      }
    }

    fetchNGO();
  }, []);

  //<UserContext.Provider value={{ userEmail, setUserEmail }}>
  //{/* <UserContext.Provider value={{ problemHeading, setProblemHeading }}> */}
  return (
    
        <>
      <Headers />
      <Routes>
        <Route path='/' element={
          <>
            <Home />
            <Carousel problems={problems} /> {/* Pass fetched problems to the Carousel component */}
          </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/maps' element={<Map/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='*' element={<Error />} />
        <Route path='/problem/p1' element={<P1/>} />
        <Route path='/addLocation' element={<AddLocation/>} />
        <Route path='/createProblem' element={<CreateProblem/>} />
        <Route path='/problem/*' element={<ProblemPage/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
      </Routes>
      <Footer/>
      </>
   
  );
}

export default App;
// </UserContext.Provider>
