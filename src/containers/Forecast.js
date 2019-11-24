import React from "react";
import DailyWeather from "../components/DailyWeather";
import moment from "moment";

class Forecast extends React.Component {
  state = {
    country: "us",
    city: "Flushing",
    dateTime: null,
    weather: null
  };

  KelvinToFahrenheitConverter(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32.0;
  }

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...this.state,
          weather: parseInt(this.KelvinToFahrenheitConverter(data.main.temp)),
          dateTime: moment.unix(data.dt).format("MMMM Do YYYY")
        });
        console.log(data);
      });
  }

  render() {
    const forecastStyle = {
      width: "75%",
      height: "50%",
      alignSelf: "center",
      background: "white",
      textAlign: "center"
    };

    const weatherDisplay = {
      display: "flex",
      flexDirection: "row",
      background: "tomato",
      height: "100%",
      justifyContent: "space-evenly",
      alignItems: "center"
    };

    return (
      <div style={forecastStyle}>
        <h1>{this.state.dateTime}</h1>
        <div style={weatherDisplay}>
          <DailyWeather weather={this.state.weather} city={this.state.city} />
        </div>
      </div>
    );
  }
}

export default Forecast;
