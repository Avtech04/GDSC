import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../componentsCSS/footer.css";


export default function App() {

  return (
    <div class="footer-dark">
      <footer>
        <div class="container1">
          <div class="row">
            <div class="item">
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">Disaster Relief Fund</a>
                </li>
                <li>
                  <a href="#">Food Redistribution Initiative</a>
                </li>
                <li>
                  <a href="#">Neighbourly Support Mediation</a>
                </li>
                <li>
                  <a href="#">Impactful Collaboration Platform</a>
                </li>
              </ul>
            </div>
            <div class="item">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
            <div class="item text">
              <h3>HarmonyHive</h3>
              <p>
                Welcome to HarmonyHive, a pioneering initiative with a mission to drive positive social change through collaborative philanthropy.
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
