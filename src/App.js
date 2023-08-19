import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NightsStayIcon from '@mui/icons-material/NightsStay';


function App() {
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState({})

  const key = 'fd5c1334c3442e72f5da2822eac0777e'
  const searchProssed = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=${key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        console.log(result)
      })
  }

  return (
    <div className="container">
    <h1>WEATHER APP</h1>
      <div className="search">
          
        <TextField
          label="Enter a city..."
          variant="outlined"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          style={{ marginTop: 10 }}
          variant="outlined"
          onClick={searchProssed}
        >Search
        </Button>
      </div>

      {typeof weather.main != "undefined" && typeof weather.sys != "undefined" ?
        <div >
          <div className="weatherInfo1">
            <h1>{weather.name} - {weather.sys.country}</h1>
            <h1> <DeviceThermostatIcon />{weather.main.temp}°</h1>

            <div className="weatherInfo2">
               <h3>
              {weather.weather[0].main === 'Clouds' ? <CloudIcon fontSize="large"/> : ''}
              {weather.weather[0].main === 'Clear' ? <CloudOffIcon fontSize="large" /> : ''}
              {weather.weather[0].main === 'Sunny' ? <WbSunnyIcon fontSize="large" /> : ''}
              {weather.weather[0].main === 'Rain' ? <ThunderstormIcon fontSize="large" /> : ''}
              {weather.weather[0].main === 'Snow' ? <AcUnitIcon fontSize="large" /> : ''}
              {weather.weather[0].main === 'Mist' ? <NightsStayIcon fontSize="large" /> : ''}
            </h3>
            <h3>{weather.weather[0].description}</h3>
            </div>
             
          </div>
          <div className="weatherInfo3">
            <p> <span>Humidity</span> <WaterDropIcon fontSize="large" />{weather.main.humidity}%</p>
            <p> <span>Feels like</span> <DeviceThermostatIcon fontSize="large" />{weather.main.feels_like}</p>
            <p> <span>Wind</span> <AirIcon fontSize="large" />{weather.wind.speed} Km/h</p>
           
          
          </div>

        </div>
        :
        ''
      }
    </div>
  );
}

export default App;
