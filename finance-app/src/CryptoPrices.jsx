import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CryptoPrices.css"; // Make sure to import the correct CSS file

function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";

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

        localStorage.setItem("cryptoData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    const storedCryptoData = localStorage.getItem("cryptoData");
    if (storedCryptoData) {
      setCryptoData(JSON.parse(storedCryptoData));
      setLoading(false);
    } else {
      fetchCryptoData();
    }
  }, []);

  const getPriceChangeArrow = (percentChange) => {
    if (percentChange > 0) {
      return <span style={{ color: "green" }}>&#9650;</span>;
    } else if (percentChange < 0) {
      return <span style={{ color: "red" }}>&#9660;</span>;
    } else {
      return <span>&#9654;</span>;
    }
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="crypto-horizontal-list-container">
          <div className="crypto-horizontal-list">
            {Array.from({ length: 500 }, (_, loopIndex) =>
              cryptoData.map((crypto, cryptoIndex) => (
                <div
                  className="crypto-info-horizontal"
                  key={`${loopIndex}-${cryptoIndex}`}
                >
                  <div className="crypto-name">
                    {crypto.name} ({crypto.symbol.toUpperCase()}):
                  </div>
                  <div className="crypto-price">
                    ${crypto.current_price}
                    {getPriceChangeArrow(crypto.price_change_percentage_24h)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoPrices;
