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
            access_token: `${process.env.REACT_APP_MAP_KEY}`,
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


  
  return (
    <Wrapper>
       <div>
      <div className='autoCompleteInputContainer' >
        <input
          id="address"
          type="text"
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
      <button onClick={props.onClick}>Confirm Location</button>
    </div>
    </Wrapper>
  )
}

export default Search

const Wrapper=styled.div`
flex:1;
`
