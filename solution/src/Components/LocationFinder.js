import React, { useState ,useEffect} from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export const LocationFinder = (props) => {
    const [mapState,setMapState]=useState(false);
    const [coordinate,setCoordinate]=useState([]);
  // mapboxgl.accessToken = `${process.env.REACT_APP_MAP_KEY}`;
  mapboxgl.accessToken =  `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`
   useEffect(()=>{
    if(mapState){
    const mp = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76,26],
      zoom:10
    });

    let marker = null
    mp.on('click', function (e) {
        setCoordinate([e.lngLat.lng,e.lngLat.lat]);
        if (marker == null) {
            marker = new mapboxgl.Marker()
                .setLngLat(e.lngLat)
                .addTo(mp);
        } else {
            marker.setLngLat(e.lngLat)
        }
    });
}

  },[mapState])
  
  const confirmClick=async()=>{
        //alert('YS');
        if(coordinate&&coordinate.length>0){
            //alert(coordinate);
            props.setCoordinate(coordinate);
            try {
                await axios.get(
                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinate[0]},${coordinate[1]}.json`,
                  {
                    params: {
                      // access_token:  `${process.env.REACT_APP_MAP_KEY}` ,
                      access_token:  `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`
                         },
                  }
                ).then((response)=>{
                    if(response.data.features.length>0){
                        console.log(response.data.features);
                        props.setAddress(response.data.features[0].place_name)}})
            
                
              } catch (error) {
                console.log(error);
              }
              console.log(coordinate);
              setMapState(false);
        }else{
            alert('PLEASE CLICK ON MAP TO CHOOSE LOCATION')
        }

  }
  
  return (
    <div>
       { !mapState?
        <button onClick={()=>{setMapState(true)}}>Choose Location on Map</button>
         :<>
        <MapWrapper id='map'></MapWrapper>
        <button onClick={confirmClick}>Confirm Location</button>
        </>}

    </div>
  )
}

const MapWrapper=styled.div`
  flex:1;
  height:400px;
`