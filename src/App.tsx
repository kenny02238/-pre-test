import React from "react";
import logo from "./logo.svg";
import FirstQuestion from "./components/FirstQuestion";
import SecondQuestion from "./components/SecondQuestion";
import "./App.css";

function App() {
  return (
    <>
      <h1>第一題</h1>
      <FirstQuestion />
      <h1>第二題</h1>
      <SecondQuestion />
    </>
  );
}

export default App;
