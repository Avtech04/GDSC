import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import axios from 'axios';

export const NgoOrder = (props) => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAP_KEY}`;
    
    const [start,setStart]=useState(false);
    const [value,setValue]=useState([]);
    const [map,setMap]=useState();
    const [direc,setDirec]=useState();
   
    const getdata=async()=>{
      try{
      let data=await axios.get('http://localhost:6005/getLocation',
      {
        params:{
          id:props.bookDetail.LocationId
        }
      });
      
        
        const mp = new mapboxgl.Map({
            container: 'map1',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [76,26],
            zoom:10
          });

          var directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            profile: 'mapbox/driving',
        });
    
    
        mp.addControl(directions,'top-left');
        console.log(props.bookDetail);
        console.log(data.data);
        directions.setOrigin(data.data[0].coordinates); 
        directions.setDestination(props.bookDetail.userCoordinate);
        setMap(mp);
        setDirec(directions);
      }catch(error){
        console.log(error);
      }
    }
    useEffect(()=>{
      getdata();
    },[props.bookDetail])
  
    const onClick=()=>{
      
      if(props.socket){
       props.socket.emit("startTracking",props.bookDetail);
        if(!navigator.geolocation){
            alert("Your Browser do Not accept Geolocation API");
        }else{
          setStart(true);

          setInterval(()=>{
           // alert("YES");
            navigator.geolocation.getCurrentPosition(onSuccess);
            function onSuccess(position) {
          const {
              latitude,
              longitude
          } = position.coords;
         setValue([latitude,longitude]);
         props.socket.emit("sendLocation",value);
         if(map&&direc){
          direc.setOrigin([longitude,latitude]);
         }
          }},5000);
         
    }
  
           
  }     
        }
        
    

  return (
    <Wrapper>
       { start?
        <div style={{flex:"1"}}>{value}</div>
        :
        <InfoWrapper>
            <button onClick={onClick}>Start</button>
        </InfoWrapper>}
        <MapWrapper id="map1"></MapWrapper>
        </Wrapper>
  )
}


const Wrapper=styled.div`
  display:flex;
 flex-direction:row;
`
const MapWrapper=styled.div`
  flex:1;
  margin: 0; padding: 0;
  height:100vh;
  width:100vw;
`
const InfoWrapper=styled.div`
  flex:1;
`
