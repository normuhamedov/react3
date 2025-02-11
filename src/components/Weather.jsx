import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "25de25d6d6c832b7f2b8bc88124fe936";
const CITIES = [
  "Tashkent",
  "Bishkek",
  "Astana",
  "Dushanbe",
  "Ashgabat",
];
function Weather() {
    const [selectedCity, setSelectedCity] = useState("Tashkent");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${selectedCity}`)
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error..");
          setLoading(false);
        });
    }, [selectedCity]);
  
    return (
      <div className="flex flex-col items-center justify-center  bg-blue-100 p-4">
        <select
          className="mb-4 p-2 rounded-md shadow-md bg-white"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {loading && <div className="text-center text-lg">Yuklanmoqda...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {weather && (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-2">{weather.location.name}, {weather.location.country}</h2>
            <p className="text-gray-600 text-lg">{weather.current.weather_descriptions}</p>
            <img src={weather.current.weather_icons[0]} alt="Weather icon" className="mx-auto my-4" />
            <p className="text-4xl font-semibold">{weather.current.temperature}°C</p>
            <div className="flex justify-between mt-4 text-gray-700">
              <p>Namlik: {weather.current.humidity}%</p>
              <p>Shamol: {weather.current.wind_speed} km/h</p>
            </div>
          </div>
        )}
      </div>
    );
}

export default Weather
