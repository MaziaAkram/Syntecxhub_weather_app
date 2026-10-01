import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("Lahore");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_API_KEY";

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      setError("");

      try {
        // Current weather API
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error("City not found");
        }

        const weatherData = await weatherResponse.json();

        // Forecast API
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error("Forecast data not found");
        }

        const forecastData = await forecastResponse.json();

        setWeather(weatherData);

        // Get one forecast for each day
        const dailyForecast = forecastData.list.filter(
          (item) => item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyForecast.slice(0, 5));
      } catch (error) {
        setWeather(null);
        setForecast([]);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <div className="weather-container">

        <h1>🌤️ Weather App</h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="loading">Loading weather data...</p>
        )}

        {error && (
          <p className="error">
            ❌ {error}
          </p>
        )}

        {weather && !loading && (
          <>
            <CurrentWeather weather={weather} />

            <Forecast forecast={forecast} />
          </>
        )}

      </div>
    </div>
  );
}

export default App;
