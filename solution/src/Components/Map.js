import React ,{useCallback,useEffect,useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import Search from './Search'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css'
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "./map.css";
import { haversine_distance } from './haversine_distance';
import { Order} from './userComponents/Order';
import { Book } from './userComponents/Book';
import axios from 'axios';

export const Map = () => {
  const [map,setMap]=useState({});
  const [userCoordinate,setUserCoordinate]=useState([]);
  const [destCoordinate,setDestCoordinate]=useState([]);
  const [userAddress,setUserAddress]=useState();
  const [bookingState,setBookingState]=useState(false);
  const [check,setCheck]=useState(false);
  const [markers,setMarkers]=useState([]);
  const [location,setLocation]=useState([]);
  const [bookDetail,setBookDetail]=useState();
  mapboxgl.accessToken = `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`
  ;

   useEffect(()=>{
    const mp = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [76,26],
      zoom:10
    });
    setMap(mp);
  },[])

  useEffect(()=>{
    if(userCoordinate&&(userCoordinate.length>0)&&map){
      const mp = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userCoordinate,
        zoom:10
      });
      setMap(mp);
      const marker1= new mapboxgl.Marker().setLngLat(userCoordinate).addTo(mp);
      setMarkers([...markers,marker1]);
    }
  },[userCoordinate])

  const onClick=async()=>{
    let bnd=[];
    console.log(userCoordinate);
    bnd.push(userCoordinate);
    //fetch data of Ngo's nearby 
    const data= await axios.get('http://localhost:6005/getLocation');
    console.log(data.data);
    if(data.data&&location){
    setLocation(data.data);
    }
    console.log(location);

    data.data.forEach((d)=>{
       let dis=haversine_distance(userCoordinate,d.coordinates);
        console.log(d);
        let arr=d.coordinates;
        bnd.push(arr);
        if(map){
         const marker1= new mapboxgl.Marker().setLngLat(arr).addTo(map);
         setMarkers([...markers,marker1]);
        
       }
       
    })
    console.log(bnd);
    if(bnd.length>1){
    if(map){
      map.fitBounds(bnd,{
        padding:60
      })
    }
  }
    setCheck(true);
  }

  useEffect(()=>{
    if(bookingState&&destCoordinate&&destCoordinate.length>0){
     
      if(map){
        
      console.log(userCoordinate,destCoordinate);
        let arr=[userCoordinate,destCoordinate];
        console.log(markers);
        markers.forEach((marker)=>{
          console.log(marker);
          marker.remove();
        })

        const marker1=new mapboxgl.Marker().setLngLat(userCoordinate).addTo(map);
        const marker2=new mapboxgl.Marker().setLngLat(destCoordinate).addTo(map);
        map.fitBounds(arr,{
          padding:60
        })
        

      }
    }
  },[bookingState]);
  
  return (
    <div> 
      <Wrapper>
      <MapWrapper id="map" style={{"margin-left": "48px",}}></MapWrapper>
        {bookingState?
        <Booking>
          <Book userCoordinate={userCoordinate} bookDetail={bookDetail} userAddress={userAddress}/>
        </Booking>
        :
        <SearchWrapper>
          <Search setUserCoordinate={setUserCoordinate} onClick={onClick} setUserAddress={setUserAddress}/>
          {check?<>
          {console.log(location)}
            {location.map((ele,index)=>{
              return <Order key={index} type={"Booking"}  setDestCoordinate={setDestCoordinate} setBookingState={setBookingState} setBookDetail={setBookDetail} userCoordinate={userCoordinate} details={ele}/>
            })}
          </>:<></>}
        </SearchWrapper>}
        
        
        </Wrapper>
      
    </div>
  )
}

const Wrapper=styled.div`
  display:flex;
 flex-direction:row;
`
const MapWrapper=styled.div`
  // flex:2;
  // margin: 0; padding: 0;
  height:70vh;
  width:70vw;
  margin:20px;
`
const SearchWrapper=styled.div`
  // flex:1;
`
const Booking =styled.div`
  // flex:1;
`

