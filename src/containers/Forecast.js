import React from "react";
import DailyWeather from "../components/DailyWeather";
import moment from "moment";

const weatherImg = {
  fog: "🌫",
  windy: "💨",
  "clear sky": "☀️",
  rain: "🌧",
  "light rain": "🌦",
  snow: "❄️",
  clouds: "🌤",
  "overcast clouds": "⛅️"
};

class Forecast extends React.Component {
  state = {
    country: "us",
    city: null,
    dateTime: null,
    weather: null,
    description: null,
    search: "",
    image: ""
  };

  KelvinToFahrenheitConverter(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32.0;
  }

  changeHandler(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  submbitHandler(e) {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.search},${this.state.country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...this.state,
          city: this.state.search,
          description: data.weather[0].description,
          weather: parseInt(this.KelvinToFahrenheitConverter(data.main.temp)),
          dateTime: moment.unix(data.dt).calendar(),
          image: weatherImg[data.weather[0].description]
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ ...this.state, search: "" });
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
      height: "100%",
      backgroundColor: "#EBEBEB",
      justifyContent: "space-evenly",
      alignItems: "center"
    };

    return (
      <div style={forecastStyle}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="collapse navbar-collapse" id="navbarColor01">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.submbitHandler.bind(this)}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Find City"
                name="search"
                onChange={this.changeHandler.bind(this)}
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <div style={weatherDisplay}>
          {this.state.weather ? (
            <DailyWeather
              weather={this.state.weather}
              city={this.state.city}
              time={this.state.dateTime}
              description={this.state.description}
              image={this.state.image}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Forecast;
