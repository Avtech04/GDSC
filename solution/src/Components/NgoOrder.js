import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import axios from 'axios';
import { haversine_distance } from './haversine_distance';

export const NgoOrder = (props) => {
  mapboxgl.accessToken = `${process.env.REACT_APP_MAP_KEY}`;

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
          function onSuccess(position) {
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
              alert("YOUR ORDER HAS BEEN SUCCESSFULLY COMPLETED");
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
    alert("YOUR ORDER HAS BEEN SUCCESSFULLY COMPLETED")
  })

  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          {props.bookDetail.userCoordinate}
        </div>

        {props.type === "User" ?
          <div style={{ flex: "1" }}>{value}</div> : <>
            {start ?
              <div style={{ flex: "1" }}>{value}</div>
              :
              <button onClick={onClick}>Start</button>

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
  flex:2;
  margin: 0; padding: 0;
  height:100vh;
  width:100vw;
`
const InfoWrapper = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
`


