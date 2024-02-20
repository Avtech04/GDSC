import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Headers from './Components/HomeComp/Headers';
import Home from './Components/HomeComp/Home';
import Login from './Components/HomeComp/Login';
import Dashboard from './Components/DistributorComp/Dashboard';
import Error from './Components/HomeComp/Error';
import Admin from './Components/Admin';
import Feature from './Components/HomeComp/Features';
import AdminDashboard from './Components/AdminDashboard';
import { UserDashboard } from './Components/userComponents/UserDashboard';
import { Map } from './Components/userComponents/Map';
import About from './Components/HomeComp/About';
import "mapbox-gl/dist/mapbox-gl.css";
import Carousel from './Components/Problems/Carousel';
import CreateProblem from './Components/Problems/Problem';
import AddLocation from './Components/DistributorComp/AddLocation';
import Signup from './Components/HomeComp/Signup';
import Footer from './Components/HomeComp/Footer';
import ProblemPage from './Components/Problems/ProblemPage';
import axios from 'axios'; 


function App() {
  
  const [problems, setProblems] = useState([]);

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

  
  return (

    <>
      <Headers />
      <Routes>
        <Route path='/' element={
          <>
            <Home />
            <About />
            <Carousel problems={problems} /> {/* Pass fetched problems to the Carousel component */}
            <Feature />
          </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userDashboard' element={<UserDashboard />} />
        <Route path='/features' element={<Feature />} />
        <Route path='/maps' element={<Map />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='*' element={<Error />} />
        <Route path='/addLocation' element={<AddLocation />} />
        <Route path='/createProblem' element={<CreateProblem />} />
        <Route path='/problem/*' element={<ProblemPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
