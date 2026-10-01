function Forecast({ forecast }) {
  return (
    <div className="forecast">

      <h2>📅 5-Day Forecast</h2>

      <div className="forecast-container">

        {forecast.map((day) => (
          <div className="forecast-card" key={day.dt}>

            <p>
              {new Date(day.dt * 1000).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }
              )}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />

            <h3>
              {Math.round(day.main.temp)}°C
            </h3>

            <p>
              {day.weather[0].description}
            </p>

            <small>
              💧 {day.main.humidity}%
            </small>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Forecast;
