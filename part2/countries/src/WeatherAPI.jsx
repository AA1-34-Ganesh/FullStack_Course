import React, { useEffect, useState } from 'react'
import axios from 'axios';

const WeatherAPI = ({ capital }) => {
    const [data, setData] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  

    useEffect(() => {
        
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl)
            .then((response) => (
                setData(response.data)
            ))
            .catch((error) => (
                console.log(error)
            ))
    }, [capital])

    if (!data) {
        return <p>Loading weather...</p>
    }
    return (
        <div>
            <h2>Weather in {capital}</h2>

            <p>Temperature {data.main.temp} Celsius</p>
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather"
            />
            <p>Wind {data.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherAPI