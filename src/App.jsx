import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.REACT_APP_WEATHER_APP}`;

  const searchLanLon = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((responce) => {
        const Lat = responce.data[0].lat;
        const Lon = responce.data[0].lon;
        const urlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&units=metric&exclude=daily&appid=${process.env.REACT_APP_WEATHER_APP}`;

        searchCity(urlLatLon);
      });
    }
  };

  const searchCity = (urlLatLon) => {
    axios.get(urlLatLon).then((responce) => {
      setData(responce.data);
    });
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLanLon}
          placeholder="Enter location"
          type="text"
        />
      </div>

      <div className="container">
        {data.main && (
          <div className="weather__info">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
                <p>{data.sys.country}</p>
              </div>
              <div className="temp">
                <h1>{data.main.temp.toFixed()}°C</h1>
              </div>
              <div className="description">
                <p>{data.weather[0].main}</p>
              </div>
            </div>

            <div className="bottom">
              <div className="info-line">
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                <p>Feels like</p>
              </div>
              <div className="info-line">
                <p className="bold">{data.main.humidity.toFixed()}%</p>
                <p>Humidity</p>
              </div>
              <div className="info-line">
                <p className="bold">{data.wind.speed.toFixed()}Km/ph</p>
                <p>Wind</p>
              </div>
              <div className="info-line">
                <p className="bold">{data.main.pressure.toFixed()}Pa</p>
                <p>Pressure</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
