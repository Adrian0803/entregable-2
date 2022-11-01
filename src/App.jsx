import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [isCelcios, setIsCelcios]= useState(true);

  const [weather, setweather] = useState([]);

  useEffect(() => {

    const succes = pos => {

      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=416d37cee76944eee4f2181cdff68098`)
        .then(res => setweather(res.data));
    }

    navigator.geolocation.getCurrentPosition(succes);

  }, [])



  console.log(weather);

  return (
    <div className="App">
      <h1>WHEATHER APP</h1>
      <h2> {`${weather.name} ${weather.sys?.country}`}  </h2>
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="" />
      <p><b>Temperatura: </b> {isCelcios ? Math.round(weather.main?.temp - 273.15) : Math.round(((weather.main?.temp - 273.15)*(9/5))+32) } 
      {isCelcios ? " Celcios" : " Fahrenheit"}
      </p>
      <button onClick={()=> setIsCelcios(!isCelcios)}>
        Cambiar Grados
      </button>

    


    </div>
  )
}

export default App
