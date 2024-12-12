import { useState } from 'react'
import './App.css'

function App() {
  const [currentTemperature, setCurrentTemperature] = useState(0)
  const [mintemperature, setminTemperature] = useState(0)
  const [maxtemperature, setmaxTemperature] = useState(0)
  const [mincelsius, setminCelsius] = useState(0)
  const [maxcelsius, setmaxCelsius] = useState(0)
  const [humidity, sethumidity] = useState(0)
  const [pressure, setpressure] = useState(0)
  const [city, setCity] = useState('')
  const [error, setError] = useState(null);

  const convertToCelsius = (temperature) => {
    setminCelsius((temperature - 273.15).toFixed(2));
    setmaxCelsius((temperature - 273.15).toFixed(2));
    setCurrentTemperature((temperature - 273.15).toFixed(2));
  };

  const getTemperature = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log(apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === '404') {
            setError('City not found. Please check the city name and try again.');
            setminTemperature(0);
            setmaxTemperature(0);
            sethumidity(0);
            return;
        }

        setError('');
        
        setminTemperature(data.main.temp_min);
        setmaxTemperature(data.main.temp_max);
        sethumidity(data.main.humidity);
        setpressure(data.main.pressure);
        convertToCelsius(data.main.feels_like);
        convertToCelsius(data.main.temp_min);
        convertToCelsius(data.main.temp_max);

    } catch (error) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error(error);
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-purple-500 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Weather App</h1>
        </div>
        
        <div className="p-6">
          <form onSubmit={getTemperature} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter City Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Get Weather
            </button>
          </form>

          {mintemperature !== 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Weather Data</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">City</p>
                  <p className="text-lg font-semibold">{city}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Feels like</p>
                  <p className="text-lg font-semibold">{currentTemperature} °C</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">{humidity}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pressure</p>
                  <p className="text-lg font-semibold">{pressure} hpa</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Min Temp (K)</p>
                  <p className="text-lg font-semibold">{mintemperature}K</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Max Temp (K)</p>
                  <p className="text-lg font-semibold">{maxtemperature}K</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Min Temp (°C)</p>
                  <p className="text-lg font-semibold">{mincelsius}°C</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Max Temp (°C)</p>
                  <p className="text-lg font-semibold">{maxcelsius}°C</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
