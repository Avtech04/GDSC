import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import P1 from '../Problems/P1';
import './carousel.css';
function DarkVariantExample() {
  return (
    <div className='card-container'>
      <Card className='cardd'>
        <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card className='cardd'>
        <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card className='cardd'>
        <Card.Img variant="top" src="https://picsum.photos/2000/2000" className='card-img' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DarkVariantExample;
