import React ,{useCallback,useEffect,useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import Search from './Search'
import mapboxgl from 'mapbox-gl';
import { haversine_distance } from './haversine_distance';
import { Order} from './userComponents/Order';
import { Book } from './userComponents/Book';
const data1=require('./location.json');

export const Map = () => {
  const [map,setMap]=useState({});
  const [userCoordinate,setUserCoordinate]=useState([]);
  const [destCoordinate,setDestCoordinate]=useState([]);
  const [bookingState,setBookingState]=useState(false);
  const [check,setCheck]=useState(false);
  const [markers,setMarkers]=useState([]);
  mapboxgl.accessToken = `${process.env.REACT_APP_MAP_KEY}`;
   useEffect(()=>{
    const mp = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76,26],
      zoom:10
    });
    setMap(mp);
    
  },[])

  useEffect(()=>{
    if(userCoordinate&&(userCoordinate.length>0)&&map){
      const mp = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userCoordinate,
        zoom:10
      });
      setMap(mp);
      const marker1= new mapboxgl.Marker().setLngLat(userCoordinate).addTo(mp);
      setMarkers([...markers,marker1]);
    }
  },[userCoordinate])

  const onClick=()=>{
    let bnd=[];
    bnd.push(userCoordinate);
    data1.data.forEach((d)=>{
       let dis=haversine_distance(userCoordinate,d.Center);
       let arr=d.Center;
       bnd.push(arr);
       //console.log(d);
       if(map){
        const marker1= new mapboxgl.Marker().setLngLat(arr).addTo(map);
        setMarkers([...markers,marker1]);
       }
    })
    if(map){
      map.fitBounds(bnd,{
        padding:60
      })
    }
    setCheck(true);
  }

  useEffect(()=>{
    if(bookingState&&destCoordinate&&destCoordinate.length>0){
     
      if(map){
        let arr=[userCoordinate,destCoordinate];
        console.log(markers);
        markers.forEach((marker)=>{
          console.log(marker);
          marker.remove();
        })
        //console.log(destCoordinate);
        const marker1=new mapboxgl.Marker().setLngLat(userCoordinate).addTo(map);
        const marker2=new mapboxgl.Marker().setLngLat(destCoordinate).addTo(map);
        map.fitBounds(arr,{
          padding:60
        })
      }
    }
  },[bookingState])
  return (
    <div> 
      <Wrapper>
        {bookingState?
        <Booking>
          <Book userCoordinate={userCoordinate}/>
        </Booking>
        :
        <SearchWrapper>
          <Search setUserCoordinate={setUserCoordinate} onClick={onClick}/>
          {check?<>
            {data1.data.map((ele,index)=>{
              return <Order key={index} type={"Booking"}  setDestCoordinate={setDestCoordinate} setBookingState={setBookingState} details={ele}/>
            })}
          </>:<></>}
        </SearchWrapper>}
        
        <MapWrapper id='map'></MapWrapper>
        </Wrapper>
      
    </div>
  )
}

const Wrapper=styled.div`
 display:flex;
 flex-direction:row;
`
const MapWrapper=styled.div`
  flex:1;
  height:400px;
`
const SearchWrapper=styled.div`
  flex:1;
`
const Booking =styled.div`
  flex:1;
`