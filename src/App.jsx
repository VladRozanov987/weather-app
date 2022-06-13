import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=21a7756d6ce5b97b7c48bedff6387783`;

  const searchLanLon = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((responce) => {

        const Lat = responce.data[0].lat;
        const Lon = responce.data[0].lon;
        const urlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&units=metric&exclude=daily&appid=21a7756d6ce5b97b7c48bedff6387783`;

        searchCity(urlLatLon);
      });
    }
  }

  const searchCity = (urlLatLon) =>{
    axios.get(urlLatLon).then((responce) => {
      const weatherInfo = responce;
      setData(weatherInfo.data);
      console.log(weatherInfo);
    })
  }

  return (
    <div className="app">

      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLanLon}
          placeholder="Enter location"
          type="text" />
      </div>

        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
              {data.main ? <p>{data.sys.country} </p> : null}
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
            {data.main ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.main !== undefined &&
            <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()}Km/ph</p> : null}
              <p>Wind</p>
            </div>
            <div className="pressure">
              {data.main ? <p className="bold">{data.main.pressure.toFixed()}Pa</p> : null}
              <p>Pressure</p>
            </div>
          </div>}
        </div>
    </div>
  );
}

export default App;
