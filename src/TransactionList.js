import React from 'react';
import './TransactionList.css';
import kaspaIcon from './Kaspa-Icon-Black.png'; // Ensure the image is in the correct path

const TransactionList = ({ transactions }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount (KAS)</th>
            <th>Amount (USD)</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{tx.date}</td>
              <td>{tx.time}</td>
              <td className="amount">
                {tx.amountFormatted}
                <img src={kaspaIcon} alt="KAS" />
              </td>
              <td className="amount">${tx.amountInUSD}</td>
              <td style={{ color: tx.typeColor }}>{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
