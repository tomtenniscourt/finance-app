import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Homepage from "./Homepage";
import Crypto from "./CryptoPrices";

function App() {
  return (
    <div className="App">
      <Crypto />
      <Homepage />
    </div>
  );
}

export default App;
