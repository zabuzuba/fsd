import './App.css';

import React, { useEffect, useMemo, useState } from 'react';

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('wss://stock-data-websocket-url'); // Use a real WebSocket URL
    
    socket.onmessage = (event) => {
      setError(null); // Reset error on receiving data
      const newStockData = JSON.parse(event.data);
      setStockData((prevData) => {
        const updatedData = [...prevData, newStockData];
        return updatedData.slice(-10); // To prevent memory overflow, keep only the latest 10
      });
    };
    
    socket.onerror = (err) => setError('Connection error. Please try again.');
    socket.onclose = () => setError('Connection closed.');

    return () => socket.close(); // Clean up WebSocket connection
  }, []);

  // Filtered stock data based on search input
  const filteredData = useMemo(
    () => stockData.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [stockData, searchTerm]
  );

  return (
    <div className="App">
      <h1>Real-Time Stock Market Dashboard</h1>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {error ? <div className="error-message">{error}</div> : 
        <FilteredStockTable stockData={filteredData} />
      }
    </div>
  );
};
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search Stocks..."
    className="search-bar"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

const StockTable = ({ stockData }) => (
  <table className="stock-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Price</th>
        <th>Change</th>
      </tr>
    </thead>
    <tbody>
      {stockData.map((stock) => (
        <tr key={stock.symbol}>
          <td>{stock.symbol}</td>
          <td>{stock.price}</td>
          <td className={stock.change > 0 ? 'positive' : 'negative'}>
            {stock.change}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const FilteredStockTable = ({ stockData }) => {
  return <StockTable stockData={stockData} />;
};

export default StockDashboard;
