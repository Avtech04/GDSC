import Carousel from 'react-bootstrap/Carousel';
import P1 from '../Problems/P1'
import { Link, NavLink } from 'react-router-dom';
function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1800/300"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <NavLink to={'/problem/p1'}>
          
          <button className="donate">Donate</button>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1800/300"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <NavLink to={'/problem/p2'}>
          
          <button className="donate">Donate</button>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1800/300"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <NavLink to={'/problem/p3'}>
          
          <button className="donate">Donate</button>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;