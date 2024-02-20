import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { haversine_distance } from '../haversine_distance';
import styled from 'styled-components';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Order = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [distance, setDistance] = useState();
  const [person, setPerson] = useState();
  const locationData = async () => {

    let data = await axios.get('http://localhost:6005/getLocation',
      {
        params: {
          id: props.details.LocationId
        }
      });
    if (data.data[0]) {
      setName(data.data[0].ngoName);
      setAddress(data.data[0].address);
    }

  }
  useEffect(() => {
    if (props.type === "Booking") {
      setName(props.details.ngoName);
      setAddress(props.details.address);
      setPerson(props.details.peoples);
      const dist = haversine_distance(props.userCoordinate, props.details.coordinates);
      setDistance(dist);
    } else if (props.type === "UserTracking") {
      locationData();
      setDistance(props.details.distance);
      setPerson(props.details.quantity);
    } else {
      setName(props.details.order_email);
      setAddress(props.details.userAddress);
      setPerson(props.details.quantity);
      setDistance(props.details.distance);
    }
  }, [props.details])
  const onClick = () => {
    if (props.type === "Booking") {
      props.setBookDetail(props.details);
      props.setDestCoordinate(props.details.coordinates);
      props.setBookingState(true);
    } else {
      props.setBookDetail(props.details)
      props.setStartOrder(true);

    }
  }
  return (
    <Wrapper onClick={onClick}>

      <Card>
        <Card.Header as="h5" style={{ background: "#c1bbbb" }}>Order By: {name} </Card.Header>
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            <p>Distance:{distance}km</p>
            <p>{person}meal</p></Card.Text>

          <Button variant="primary">{props.details.status
            ? "See Details"
            : props.type === "UserTracking"
              ? "Track Your Order"
              : props.type === "Booking" ?
                "Make An Order"
                : "Complete Now"}</Button>
        </Card.Body>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
 display:flex;
 flex-direction:row;
//  background:#000000;
  color:#ffffff;
 height:fit-content;
 margin:10px;
 padding:10px;
 border-radius:10px;
`;
const Details = styled.div`
 flex:2;
 padding:10px;
 
`
const Contribution = styled.div`
    flex:1;
`