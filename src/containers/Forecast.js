import React from "react";
import DailyWeather from "../components/DailyWeather";
import moment from "moment";

class Forecast extends React.Component {
  state = {
    country: "us",
    city: null,
    search: "",
    forecast: []
  };

  changeHandler(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  submbitHandler(e) {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search},${this.state.country}&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        const dateTime = moment.unix(data.list[0].dt).calendar();
        const time = dateTime
          .split(" ")
          .splice(2, 3)
          .join(" ");
        const fiveDay = data.list.filter(date =>
          moment
            .unix(date.dt)
            .calendar()
            .includes(time)
        );

        this.setState({
          ...this.state,
          forecast: fiveDay,
          city: this.state.search
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
          {this.state.forecast
            ? this.state.forecast.map((day, i) => (
                <DailyWeather key={i} day={day} city={this.state.city} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Forecast;
