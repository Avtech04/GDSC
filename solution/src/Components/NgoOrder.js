import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import axios from 'axios';
import { haversine_distance } from './haversine_distance';
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Body>
        <h4>Success</h4>
        <p>
          Your Order has been successfully completed !
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export const NgoOrder = (props) => {
  mapboxgl.accessToken = `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`;
  const [modalShow, setModalShow] = React.useState(false);
  const [start, setStart] = useState(false);
  const [value, setValue] = useState([]);
  const [map, setMap] = useState();
  const [direc, setDirec] = useState();

  const getdata = async () => {
    try {
      let data = await axios.get('http://localhost:6005/getLocation',
        {
          params: {
            id: props.bookDetail.LocationId
          }
        });


      const mp = new mapboxgl.Map({
        container: 'map1',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [76, 26],
        zoom: 10
      });

      var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: 'mapbox/driving',
      });


      mp.addControl(directions, 'top-left');
      // console.log(props);
      console.log("order detail")
      console.log(props.bookDetail);
      console.log(data.data);
      directions.setOrigin(data.data[0].coordinates);
      directions.setDestination(props.bookDetail.userCoordinate);
      setMap(mp);
      setDirec(directions);
      props.socket.emit("startTracking", props.bookDetail._id);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getdata();
  }, [props.bookDetail])

  const onClick = () => {

    if (props.socket) {

      if (!navigator.geolocation) {
        alert("Your Browser do Not accept Geolocation API");
      } else {
        setStart(true);

        var intervalId = setInterval(() => {
          navigator.geolocation.getCurrentPosition(onSuccess);
          async function onSuccess(position) {
            const {
              latitude,
              longitude
            } = position.coords;
            setValue([latitude, longitude]);
            props.socket.emit("sendLocation", { latitude, longitude });
            if (map && direc) {
              direc.setOrigin([longitude, latitude]);
            }
            let destCoord = [longitude, latitude];
            let dist = haversine_distance(props.bookDetail.userCoordinate, destCoord);
            if (dist <= 0.1) {
              // alert("YOUR ORDER HAS BEEN SUCCESSFULLY COMPLETED");
              setModalShow(true)
              props.socket.emit("stopTracking");
              clearInterval(intervalId);
            }
          }
        }, 5000);

      }


    }
  }

  props.socket.on("recieveLocation", (data) => {

    if (map && direc) {
      direc.setOrigin([data.longitude, data.latitude]);
    }
  });
  props.socket.on("stopTracking",()=>{
    setModalShow(true)
    // alert("YOUR ORDER HAS BEEN SUCCESSFULLY COMPLETED")
  })

  return (
    <Wrapper>
      <InfoWrapper>
        
      <Card style={{ width: '18rem',marginLeft:'5vw' }}>
      <Card.Header style={{background: 'grey',
    color: 'white',}}>Order Details</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><b>Order ID:</b> {props.bookDetail.orderid}</ListGroup.Item>
        <ListGroup.Item><b>Food Type:</b> {props.bookDetail.food_type}s</ListGroup.Item>
        <ListGroup.Item><b>Quantity:</b> {props.bookDetail.quantity}</ListGroup.Item>
        <ListGroup.Item><b>Freshness:</b> {props.bookDetail.freshness}</ListGroup.Item>
        <ListGroup.Item><b>Email:</b> {props.bookDetail.order_email}</ListGroup.Item>
        <ListGroup.Item><b>Address:</b> {props.bookDetail.userAddress}</ListGroup.Item>
        <ListGroup.Item><b>Status:</b> {props.bookDetail.status ? 'Completed' : 'Not Completed'}</ListGroup.Item>
      </ListGroup>
    </Card>
        {props.type === "User" ?
          <div style={{ flex: "1" }}>{value}</div> : <>
            {start ?
              <div style={{ flex: "1" }}>{value}</div>
              :
              <button onClick={onClick} style={{
                width: '10vw',
                background: 'blue',
                color: 'white',
                padding: '10px',
                borderRadius: '12px',
                border: '0px',
                marginLeft: '9vw',
                marginTop: '5vh',
              }}>Start</button>

            }
          </>}
         
      </InfoWrapper>
      <MapWrapper id="map1"></MapWrapper>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display:flex;
 flex-direction:row;
`
const MapWrapper = styled.div`
padding: 60px;
height: 88vh;
width: 94vw;
margin-left: 36px;
margin-bottom: 40px;
border: 9px solid;
margin-right: 17px;
`
const InfoWrapper = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
`


