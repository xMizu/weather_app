import React from "react";

const DailyWeather = props => {
  const { weather, city } = props;
  const weatherStyle = {
    width: "18%",
    height: "75%",
    backgroundColor: "#81D6E3"
  };

  return (
    <div style={weatherStyle}>
      <h1>{city}</h1>
      <h4>{weather}&deg;</h4>
    </div>
  );
};

export default DailyWeather;
