import React,{useEffect, useState}from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import  styled  from 'styled-components';
import axios from 'axios';
import "./search.css";
import { haversine_distance } from './haversine_distance';


const Search = (props) => {
  const [value,setValue]=useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coordinate,setCoordinate]=useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
    handleInputChange(event.target.value);
  };



  const handleInputChange = async (query) => {
     
    try { 
      await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token: `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`,
               },
        }
      ).then((response)=>{setSuggestions(response.data.features)})
  
      
    } catch (error) {
      console.error("There was an error while fetching places:", error);
    }
  };

  useEffect(()=>{
    props.setUserAddress(value);
    props.setUserCoordinate(coordinate);
    
  },[coordinate])
  const handleSuggestionClick = async(suggestion) => {
    setValue(suggestion.place_name)
    setCoordinate(suggestion.center);
    setSuggestions([]);
  };

  const currentLocation=()=>{
    navigator.geolocation.getCurrentPosition(onSuccess);
          async function onSuccess(position) {
            const {
              latitude,
              longitude
            } = position.coords;
            props.setUserCoordinate([longitude, latitude]);
            try{
            axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
              {
                params: {
                  // access_token:  `${process.env.REACT_APP_MAP_KEY}` ,
                  access_token:  `pk.eyJ1IjoiYW5raXQzMTMwIiwiYSI6ImNscnA1OHoxejAwcGcybG9mNDRyeGN4MHcifQ.j3Xp9yhfyvgdL5Kh5Jqc3Q`
                     },
              }
            ).then((response)=>{
                if(response.data.features.length>0){
                  props.setUserAddress(response.data.features[0].place_name)}});
                  //props.onClick();
          } catch (error) {
            console.log(error);
          }

           

      }
  }

  
  return (
    <Wrapper>
      <h2 style={{textAlign:"center"}}>Choose the Location</h2>
      <div style={{display:"flex"}}>
       <div>
        
      <div className='autoCompleteInputContainer'  >
        <button onClick={currentLocation} className="btn btn-primary">Choose current location</button>
        <p style={{fontSize:'20px',paddingLeft:'20px'}}>or</p>
        <input
          id="address"
          type="text" style={{width: "27vw",
            height: "9vh",
            "margin-left": "9px",}}
          placeholder="Enter your Location"
          value={value}
          onChange={handleChange}
        />
        <ul className="addressSuggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div>
      <button onClick={props.onClick} className="btn btn-primary">Confirm Location</button>
      </div>
    </div>
    </Wrapper>
  )
}

export default Search

const Wrapper=styled.div`
flex:1;
`
