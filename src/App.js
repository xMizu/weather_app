import React from "react";
import Forecast from "./containers/Forecast";

function App() {
  const homepageStyle = {
    backgroundColor: "#59C3C3",
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
