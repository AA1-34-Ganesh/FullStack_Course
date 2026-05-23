import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Button from "./Button";


function App(){
  const [search,setSearch]=useState('');
  const [displayData,setDisplayData]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState(null);
  const handleInputChange=(event)=>{
    setSearch(event.target.value);
    setSelectedCountry(null);
  }
  const filterData=displayData.filter((country)=> 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  const  renderSpecificCountryDetails=(country)=>(
             <div key={country.cca3}>
              <h2>{country.name.common}</h2>

              <p>
                Capital: {country.capital?.[0] || "N/A"}
              </p>

              <p>
                Area: {country.area}
              </p>

              <h3>Languages</h3>

              <ul>
                {Object.values(country.languages || {}).map(
                  (language) => (
                    <li key={language}>
                      {language}
                    </li>
                  )
                )}
              </ul>

              <img
                src={country.flags.png}
                alt={country.flags.alt}
                width="200"
              />
            </div>
  )
  useEffect(()=>{
 axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response)=>{
    setDisplayData(response.data);
  })
  },[])
  return(
      <div>

        <form>
          Find Countries  <input value={search} onChange={handleInputChange} />
        
        </form>
    
        <div>
        {
         filterData.length > 10 ? (
          <p>Too many matches, specify another filter.</p>
        ) : filterData.length > 1 ? (
          filterData.map((country) => (
            <div key={country.cca3}>
              {country.name.common}
              <Button text= "show" onClick={()=>setSelectedCountry(country)}/>
                {
                  (selectedCountry?.cca3 === country?.cca3 && renderSpecificCountryDetails(country))
                }
            </div>
          ))
        ) : filterData.length===1?(
          renderSpecificCountryDetails(filterData[0])
        ):(
           <p>No countries found</p>
        )
      }
      </div>
     
      </div>
  )
}
export default App