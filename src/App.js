import React from "react";
import Forecast from "./containers/Forecast";

function App() {
  const homepageStyle = {
    backgroundColor: "#B2DDF7",
    height: "100vh",
    width: "100vw",
    margin: 0,
    display: "flex",
    justifyContent: "center"
  };
  return (
    <div style={homepageStyle}>
      <Forecast />
    </div>
  );
}

export default App;
