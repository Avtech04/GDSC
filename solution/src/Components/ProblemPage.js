import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

import { Appstate } from "../contextApi";

const ProblemPage = ({ headline, description }) => {
   
    const {problemHeadline} = Appstate();
    const {problemDescription} = Appstate();
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1>{problemHeadline}</h1>
      </div>

      <div className='problem-container'>
        <div className='left-problem-container'>
          <div className='image-problems'>
            <img
              className="d-block w-100"
              src="https://picsum.photos/1800/300"
              alt="Problem slide" 
            />
          </div>
          <div>
              <button className='Donate-button' onClick={notify} style={{textAlign:"center"}}>Donate now</button>
          </div>
        </div>
        <div className='right-problem-container'>{problemDescription}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ProblemPage;
