// import React from 'react'

import axios from 'axios'
import { useState } from 'react'

const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [error, setError] = useState(false)

  const searchWeather = (e) => {
    e.preventDefault()
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=&units=metric`)
      .then(({ data }) => {
        setWeather(data)
        setError(false)
      })
      .catch(() => {
        setError(true)
      })
    setCity('')
  }

  const getTime = (timesStamp) => {
    const time = new Date(timesStamp * 1000)
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return `${hours} : ${minutes}`

  }


  return (
    <div>
      <div className='container'>
        <form className='form' onSubmit={searchWeather}>
          <input type="text" value={city} className='input' onChange={e => setCity(e.target.value)} placeholder="Введите название города" />
          <button className='btn'>Поиск</button>
        </form>
      </div>
      <div>
        {
          Object.keys(weather).length !== 0 && (
            <div className='weather-container'>
              <h2 className='city'>{weather.name}</h2>
              <p className='temperature'>{weather.main.temp}°C</p>
              <p className='humidity'>Влажность: {weather.main.humidity}</p>
              <p className='description'>Описание: {weather.weather[0].description}</p>
              <p className='sunrise'>Рассвет: {getTime(weather.sys.sunrise)}</p>
              <p className='sunset'>Закат: {getTime(weather.sys.sunset)}</p>
            </div>
          )}
      </div>


    </div>
  )

}

export default App

//rafce