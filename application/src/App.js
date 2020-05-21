import React from "react";
import logo from "./logo.svg";
import Layout from "./Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <img src={logo} className="App-logo" alt="logo" />
    </Layout>
  );
}

export default App;
