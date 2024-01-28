import React ,{useCallback,useEffect,useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import Search from './Search'
import mapboxgl from 'mapbox-gl';
import { haversine_distance } from './haversine_distance';
import { Order } from './userComponents/Order';
const data1=require('./location.json');

export const Map = () => {
  const [map,setMap]=useState({});
  const [ct,setCt]=useState([]);
  const [check,setCheck]=useState(false);
  mapboxgl.accessToken = `${process.env.REACT_APP_MAP_KEY}`;
   useEffect(()=>{
    const mp = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76,26],
      zoom:10
    });
    setMap(mp);
    mp.on('click',(e)=>{
      console.log(e.lngLat);
    })
    const marker1= new mapboxgl.Marker().setLngLat([76,26]).addTo(mp);
  },[])

  useEffect(()=>{
    if(ct&&(ct.length>0)&&map){
      const mp = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: ct,
        zoom:10
      });
      setMap(mp);
      const marker1= new mapboxgl.Marker().setLngLat(ct).addTo(mp);
    }
  },[ct])

  const onClick=()=>{
    let bnd=[];
    bnd.push(ct);
    data1.data.forEach((d)=>{
       let dis=haversine_distance(ct,d.Center);
       let arr=d.Center;
       arr.reverse();
       
       bnd.push(d.Center);
       if(map){
        const marker1= new mapboxgl.Marker().setLngLat(arr).addTo(map);
       }
    })
    if(map){
      map.fitBounds(bnd,{
        padding:60
      })
    }
    setCheck(true);
  }
  return (
    <div> 
      <Wrapper>
        <SearchWrapper>
          <Search setCt={setCt} onClick={onClick}/>
          {check?<>
            {data1.data.map((ele,index)=>{
              return <Order key={index} />
            })}
          </>:<></>}
        </SearchWrapper>
        
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