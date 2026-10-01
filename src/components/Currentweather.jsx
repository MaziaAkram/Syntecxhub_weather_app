function CurrentWeather({ weather }) {
  return (
    <div className="current-weather">

      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      </div>

      <h3>
        {Math.round(weather.main.temp)}°C
      </h3>

      <p className="condition">
        {weather.weather[0].description}
      </p>

      <div className="weather-details">

        <div className="detail-card">
          <span>🌡️</span>
          <p>Temperature</p>
          <strong>
            {Math.round(weather.main.temp)}°C
          </strong>
        </div>

        <div className="detail-card">
          <span>💧</span>
          <p>Humidity</p>
          <strong>
            {weather.main.humidity}%
          </strong>
        </div>

        <div className="detail-card">
          <span>💨</span>
          <p>Wind Speed</p>
          <strong>
            {weather.wind.speed} m/s
          </strong>
        </div>

        <div className="detail-card">
          <span>☁️</span>
          <p>Condition</p>
          <strong>
            {weather.weather[0].main}
          </strong>
        </div>

      </div>
    </div>
  );
}

export default CurrentWeather;
