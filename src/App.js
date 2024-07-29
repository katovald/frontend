import logo from "./logo.svg";
import "./App.css";

import React from "react";
import Auth from "./component/Auth";
import Production from "./component/Production";
import Purchase from "./component/Purchase";
import Sales from "./component/Sales";
import Accounting from "./component/Accounting";
import HumanResources from "./component/HumanResources";
import Security from "./component/Security";

function App() {
  return (
    <div className="App">
      <header className="App-header">ERP Prototipo</header>
      <Auth />
      <Production />
      <Purchase />
      <Sales />
      <Accounting />
      <HumanResources />
      <Security />
    </div>
  );
}

export default App;
