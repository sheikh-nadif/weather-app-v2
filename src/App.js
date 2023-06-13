import React, {useState} from "react";
import axios from "axios";


function App() {

  const [data,setData] = useState ({});
  const [location, setLocation] = useState ('');

  const API_KEY = "701af9383ca7c886124a1b200574d690";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;


  const searchLocation = (event) => {

    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('');
    }
  }
 
  
  return (
    <div className="app">
      <div class="search">
        <input
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder = "Enter your weather location..."
        type = "text">
        </input>
      </div>
      <div class="container">
          <div class="top">
              <div class="location">
                  <h3>{data.name}
                      {data.sys ? <span class="country">{data.sys.country}</span> : null}
                  </h3>
              </div>
              <div class="temp">
                {data.main ? <h1>
                          {Math.round(data.main.temp)}<span>&deg;C</span>
                  </h1> : null}
                  
              </div>
              <div class="description">
                  {data.weather ? <p>{data.weather[0].main} 
                  
                  {data.main ? 
                  <span class="HighLow-temp temp-padding">{Math.round(data.main.temp_max)}<span>&deg;C</span>
                  <span class="HighLow-temp">/{Math.round(data.main.temp_min)}&deg;C</span>
                  </span> : null}
                  </p> :null}
              </div>
          </div>

          {data.name !== undefined &&
            <div class="bottom">
                <div class="feels">
                    {/* Math.round() is similar to toFixed() */}
                    {data.main ? <p>{data.main.feels_like.toFixed()}<span>&deg;C</span></p> :null}
                    <p class="bottom-desc">Feels Like</p>
                </div>
                <div class="humidity">
                    {data.main ? <p>{data.main.humidity}<span>%</span></p> :null}
                    <p class="bottom-desc">Humidity</p>
                </div>
                <div class="wind">
                    {data.wind ? <p>{data.wind.speed}<span> km/h</span></p> : null}
                    <p class="bottom-desc">Wind</p>
                </div>
            </div>
          }

      </div>

    </div> 
  );
}

export default App;
