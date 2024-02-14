import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './carousel.css';


import { Appstate } from "../contextApi";

function Carousel() {
  const [problems, setProblems] = useState([]);
  const {setProblemHeadline} = Appstate();
  const {setProblemDescription} =Appstate();
  const {setProblemID}=Appstate();
  const {problemID} = Appstate();
  const {problemHeadline} = Appstate();
  // const { problemDescription, setProblemDescription } = useContext(UserContext);
  
  // const { problemHeading, setProblemHeading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get('http://localhost:6005/api/problems');
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    }

    fetchProblems();
  }, []);

  const handleClick = (id) => { 
    navigate(`/problem/${id}`);
  };

  return (
    <div className='card-container'>
      {problems.map(problem => (
        <Card key={problem._id} className='cardd' onClick={() => handleClick(problem._id)}>
          <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
          <Card.Body>
            <Card.Title className='card_title'>{problem.headline}</Card.Title>
            <Card.Text className='card_description'>{problem.description}</Card.Text>
            <Button variant="primary" className='Donate_btn' onClick={() => {
    
             setProblemHeadline(problem.headline);
             setProblemDescription(problem.description);
             setProblemID(problem._id);
             
             console.log("hey")
             console.log(problemID);
             console.log("hello")
             console.log(problemHeadline)
              handleClick(problem._id)}}>Donate </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Carousel;
