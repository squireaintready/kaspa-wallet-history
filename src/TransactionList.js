import React from 'react';
import './TransactionList.css';

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
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{tx.date}</td>
              <td style={{ textAlign: 'center' }}>{tx.time}</td>
              <td className="amount">{tx.amountFormatted}</td>
              <td className="amount">{tx.amountInUSD}</td>
              <td style={{ color: tx.typeColor, textAlign: 'center' }}>{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
