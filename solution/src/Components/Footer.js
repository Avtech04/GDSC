import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./footer.css";
export default function App() {
  // <MDBFooter className='text-center text-white' style={{ backgroundColor: '#6610f2', color:'#ffffff' }}>
  // <MDBContainer className='pt-4'>
  //   <section className='mb-4'>
  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fab fa-facebook-f' />
  //     </MDBBtn>

  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fa-twitter' />
  //     </MDBBtn>

  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fa-google' />
  //     </MDBBtn>

  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fa-instagram' />
  //     </MDBBtn>

  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fa-linkedin' />
  //     </MDBBtn>

  //     <MDBBtn
  //       rippleColor="dark"
  //       color='link'
  //       floating
  //       size="lg"
  //       className='text-dark m-1'
  //       href='#!'
  //       role='button'
  //     >
  //       <MDBIcon fab className='fa-github' />
  //     </MDBBtn>
  //   </section>
  // </MDBContainer>
  //   <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
  //   © 2020 Copyright:
  //   <a className='text-dark' href='https://mdbootstrap.com/'>
  //     MDBootstrap.com
  //   </a>
  // </div>
  // </MDBFooter>
  return (
    <div class="footer-dark">
      <footer>
        <div class="container1">
          <div class="row">
            <div class="item">
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">Web design</a>
                </li>
                <li>
                  <a href="#">Development</a>
                </li>
              </ul>
            </div>
            <div class="item">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
              </ul>
            </div>
            <div class="item text">
              <h3>Company Name</h3>
              <p>
                Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                Vivamus ac sem lacus..
              </p>
            </div>
          </div>
          <div class="col item social">
            <a href="#">
            <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
            <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
            <i class="fa-brands fa-github"></i>
            </a>
            <a href="#">
            <i class="fa-brands fa-linkedin"></i>
            </a>
          </div>

          <p class="copyright">Solution Challenge © 2024</p>
        </div>
      </footer>
    </div>
  );
}
