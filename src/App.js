import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList';
import SearchBar from './SearchBar';
import Loader from './Loader'; // Create a new Loader component
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [kasPrice, setKasPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchKasPrice = async () => {
    try {
      const response = await axios.get('https://api.kaspa.org/info/price?stringOnly=false');
      setKasPrice(response.data.price);
    } catch (error) {
      console.error('Error fetching KAS price:', error);
    }
  };

  const fetchTransactions = async () => {
    if (!address) {
      setError('Please enter a valid address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [balanceResponse, transactionsResponse] = await Promise.all([
        axios.get(`https://api.kaspa.org/addresses/${encodeURIComponent(address)}/balance`),
        axios.get(`https://api.kaspa.org/addresses/${encodeURIComponent(address)}/full-transactions?limit=500&offset=0&resolve_previous_outpoints=no`)
      ]);

      const formattedBalance = (balanceResponse.data.balance / 1e8).toFixed(6);
      const balanceInUSD = (balanceResponse.data.balance / 1e8 * kasPrice).toFixed(2);
      setBalance({ kas: formattedBalance, usd: balanceInUSD });

      const formattedTransactions = transactionsResponse.data.map(tx => {
        const isInput = tx.outputs.some(output => output.script_public_key_address === address);
        const amount = tx.outputs.reduce((acc, output) => {
          if (output.script_public_key_address === address) {
            return acc + output.amount;
          }
          return acc;
        }, 0);

        const date = new Date(tx.block_time);
        return {
          date: date.toLocaleDateString(),  // Format as needed
          time: date.toLocaleTimeString(),  // Format as needed
          amountFormatted: (amount / 1e8).toFixed(6),
          amountInUSD: (amount / 1e8 * kasPrice).toFixed(2),
          type: isInput ? 'In' : 'Out',
          typeColor: isInput ? 'green' : 'red'
        };
      });

      setTransactions(formattedTransactions);
    } catch (error) {
      setError('Error fetching transactions. Please check the address and try again.');
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKasPrice();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>KASPA Wallet Tracker</h1>
        <SearchBar address={address} setAddress={setAddress} fetchTransactions={fetchTransactions} />
        {kasPrice && (
          <div className="kas-price">
            <h2>KAS Price: ${kasPrice}</h2>
          </div>
        )}
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <Loader />
        ) : (
          <>
            {balance && (
              <div className="balance-container">
                <h3>Balance</h3>
                <p>{balance.kas} KAS (${balance.usd})</p>
              </div>
            )}
            <TransactionList transactions={transactions} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
