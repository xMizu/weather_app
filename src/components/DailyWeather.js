import React from "react";
import moment from "moment";

const DailyWeather = props => {
  const { day, city } = props;
  const { weather, main, dt } = day;

  const weatherImg = {
    fog: "🌫",
    windy: "💨",
    Clear: "☀️",
    Rain: "🌧",
    "light rain": "🌦",
    Snow: "❄️",
    Clouds: "🌤",
    "overcast clouds": "⛅️"
  };

  return (
    <div className="card bg-light mb-3" style={{ width: "10rem" }}>
      <div className="card-header">
        {
          moment
            .unix(dt)
            .calendar()
            .split(" ")[0]
        }
      </div>
      <div className="card-body">
        <h4 className="card-title" style={{ textTransform: "capitalize" }}>
          {city}
        </h4>
        <p className="card-text" style={{ fontSize: "2rem" }}>
          {weatherImg[weather[0].main]}
        </p>
        <p className="card-text">{weather[0].description}</p>
        <p className="card-text">{parseInt(main.temp)}&deg;</p>
      </div>
    </div>
  );
};

export default DailyWeather;
