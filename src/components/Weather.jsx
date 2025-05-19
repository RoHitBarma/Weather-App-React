import React, { useEffect, useState, useRef } from "react";
import './Weather.css';
import search_icon from '../images/search.png'
import wind_icon from '../images/wind.png'
import snow_icon from '../images/snow.png'
import clearWeather_icon from '../images/clearWeather.png'
import clouds_icon from '../images/clouds.png'
import drizzle_icon from '../images/drizzle.png'
import humidity_icon from '../images/humidity.png'
import rain_icon from '../images/rain.png'

const Weather = () => {

    const [WeatherData, setWeatherData] = useState(false)
    const inputRef = useRef()

    const allIcons = {
        "01d" : clearWeather_icon,
        "01n" : clearWeather_icon,
        "02d" : clouds_icon,
        "02n" : clouds_icon,
        "03d" : clouds_icon,
        "03n" : clouds_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon
    }

    const search = async (city) => {

        if(city === ""){
            alert("Please enter city name.")
            return;
        }
        try {
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}`;
            const urrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
            
            const response = await fetch(urrl);
            const data = await response.json()
            console.log(data);
            if(data.cod === "404"){
                alert("City not found. Please enter a valid city name.")
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clearWeather_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            
        } catch (error) {
            setWeatherData(false)
            console.log("Error in fetching weather data.")
        }
    }

    useEffect(()=>{
        search("Delhi")
    }, [])
    return(
        <div className="weather">
            {/* <h1>Weather App</h1> */}
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Enter Place"/>
                <img src={search_icon} alt="searchIcon" className="searchIcon" onClick={()=>search(inputRef.current.value)}/>
            </div>

            {}
            <div className="weatherDetails">
                <img src={WeatherData.icon} alt="clearWeather" className="weather-icon"/>
                <div className="temperature">{WeatherData.temperature}°C</div>
                <div className="location">{WeatherData.location}</div>
            </div>

            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="humidity icon" />
                    <div>
                        <p>{WeatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="wind icon" />
                    <div>
                        <p>{WeatherData.windSpeed} km/h</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;