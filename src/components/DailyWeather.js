import React from "react";

const DailyWeather = props => {
  const { weather, city, time, description, image } = props;

  return (
    <div className="card bg-light mb-3" style={{ maxWidth: "20rem" }}>
      <div className="card-header">{time}</div>
      <div className="card-body">
        <h4 className="card-title" style={{ textTransform: "capitalize" }}>
          {city}
        </h4>
        <p className="card-text" style={{ fontSize: "2rem" }}>
          {image}
        </p>
        <p className="card-text">{description}</p>
        <p className="card-text">{weather}&deg;</p>
      </div>
    </div>
  );
};

export default DailyWeather;
