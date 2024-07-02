import React from 'react';
import './SearchBar.css';

const SearchBar = ({ address, setAddress, fetchTransactions }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Enter KASPA address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchTransactions}>Search</button>
    </div>
  );
};

export default SearchBar;
