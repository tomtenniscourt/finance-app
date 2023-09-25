import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch crypto data from the API
    const fetchCryptoData = async () => {
      try {
        // Define the URL for the CoinGecko API endpoint you want to fetch
        const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";

        // Define the parameters for the API request
        const params = {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 15,
          page: 1,
          sparkline: false,
        };

        const response = await axios.get(apiUrl, { params });
        setCryptoData(response.data);
        setLoading(false);

        // Store the data in localStorage
        localStorage.setItem("cryptoData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    // Check if cryptoData exists in localStorage
    const storedCryptoData = localStorage.getItem("cryptoData");
    if (storedCryptoData) {
      setCryptoData(JSON.parse(storedCryptoData));
      setLoading(false);
    } else {
      // If not found in localStorage, fetch data from the API
      fetchCryptoData();
    }
  }, []);

  // Function to determine whether to display an up or down arrow with styling
  const getPriceChangeArrow = (percentChange) => {
    if (percentChange > 0) {
      return <span style={{ color: "green" }}>&#9650;</span>; // Green up arrow
    } else if (percentChange < 0) {
      return <span style={{ color: "red" }}>&#9660;</span>; // Red down arrow
    } else {
      return <span>&#9654;</span>; // Right arrow (no change)
    }
  };

  return (
    <div className="App">
      <h1>Tom's Finance App</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="crypto-list">
          {cryptoData.map((crypto, index) => (
            <li key={index}>
              <div className="crypto-info">
                <div className="crypto-name">
                  {crypto.name} ({crypto.symbol.toUpperCase()}):
                </div>
                <div className="crypto-price">
                  ${crypto.current_price}
                  {getPriceChangeArrow(crypto.price_change_percentage_24h)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
