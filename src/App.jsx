import React, {useState, useEffect} from "react";
import "./styles.css"

const App = () =>{
    const[location, setLocation] = useState(" ")
    const[temperature, setTemperature] = useState()
    const[weather, setWeather] = useState(" ")

    let foundLocation = []
    let tempLocation
    
    const apiKey = "0a1a887da1e5fdb4d28ed506f88c2eb2"
    
    const backGroundStyle = {
        backgroundImage: `url("./src/assets/${weather}.jpg")`
    }

    function handleChange(event){
        const {name, value} = event.target
        tempLocation=value
    }

    function submitLocation(){
        setLocation(tempLocation)
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            setTemperature(Math.round(data.main.temp - 273.15))
            setWeather(data.weather[0].main)
            foundLocation[0] = data.name
            foundLocation[1] = data.sys.country
        })
        .catch(error => console.log(error));

    console.log(foundLocation);
    return(
        <div className="container">
            <div className="search-bar">
                <input 
                    type="text"
                    name="location"
                    onChange={handleChange}
                    value={tempLocation}
                  />
                  <button
                    onClick={submitLocation}
                  >
                    Search
                  </button>
            </div>
            <div className="card">
                <div className="stats">
                    <div className="location">{location}</div>
                    <div className="temperature">{temperature}°C</div>
                    <div className="weather-name">{weather}</div>
                </div>
                <div 
                    className="image blur"
                    style={backGroundStyle}
                    >
                </div>
            </div>
        </div>
    )
}

export default App