import React, { useEffect,useState,useRef  } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const searchRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  // const handleKeyDown = (event) => {
  //   console.log("Working")
  //   console.log(event.key)  
  //   if (event.key === "Enter") {
  //     search(searchRef.current.value)
  //   }
  // }


  const search = async (city) => {

    if (city === "") {
      alert("Please enter a city name")
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok){
        alert(data.message)
        return
      }

      const imageIcon = data.weather[0].icon;
      
      const weatherIcon = `https://openweathermap.org/img/wn/${imageIcon}@2x.png`;
      
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        icon: weatherIcon
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data");
    }
  }

  


  return (
    <div id = "weather" className ="place-self-center flex flex-col items-center rounded-xl bg-linear-to-r from-blue-800 to-blue-600">
      <div id = "search-bar" className='flex items-center gap-3'>
         <input ref={searchRef} id="search-bar" className="h-12 border-0 rounded-xl outline-0 text-[#626262] bg-[#ebfffc] " type="text" placeholder='Search'/>
         <img id = "search-icon" src={search_icon} alt="" className='w-[46px] rounded-full bg-[#ebfffc] cursor-pointer' onClick={() => search(searchRef.current.value)}/>
      </div>
      {weatherData?<>
        <img id="weather-icon" className="w-[170px]" src={weatherData.icon} alt=""/>
      <p id="temperature" className='text-[#fff] text-[80px] leading-20'>{weatherData.temperature}&#176;C</p>
      <p id='location' className='text-white text-[40px]'>{weatherData.city}</p>
      <div id ="weather-data" className="text-white flex justify-between gap-6">
        <div id = "column" className='flex items-start gap-[12px] text-[22px]'>
          <img id ="image" src={humidity_icon} alt="" className='w-[26px]' />
          <div>
            <p>{weatherData.humidity} %</p>
            <span className='block text-[16px]'>Humidity</span>
          </div>
        </div>
        <div id = "column" className='flex items-start gap-[12px] text-[22px]'>
          <img id="image" src={wind_icon} alt="" className='w-[26px]' />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span className='block text-[16px]'>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather