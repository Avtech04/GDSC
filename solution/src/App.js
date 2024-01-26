// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import Admin from './Components/Admin';
import AdminDashboard from './Components/AdminDashboard';
import { Routes, Route } from "react-router-dom"
import Carousel from './Components/Carousel';
import CreateProblem from './Components/Problem';
import AddLocation from './Components/AddLocation';
import P1 from './Problems/P1';
import P2 from './Problems/P2';
import P3 from './Problems/P3';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={
        <>
        <Home />
        <Carousel/>
        </>
      
      } />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='*' element={<Error />} />
        <Route path='/problem/p1' element={<P1/>} />
        <Route path='/problem/p2' element={<P2/>} />
        <Route path='/problem/p3' element={<P3/>} />
        <Route path='/addLocation' element={
        <AddLocation/>}/>
        <Route path='/createProblem' element={
        <CreateProblem/>}/>
      </Routes>

      
    </>
  );
}

export default App;
