import React, { useState } from 'react';
import { User, TransferData } from '../types';
import { users } from '../data/users';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientUser = users.find(u => u.username === recipient);
    if (!recipientUser) {
      setMessage('Recipient not found');
      return;
    }
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setMessage('Invalid amount');
      return;
    }
    if (user.balance < transferAmount) {
      setMessage('Insufficient funds');
      return;
    }
    
    // Perform transfer
    user.balance -= transferAmount;
    recipientUser.balance += transferAmount;
    setMessage(`Successfully transferred $${transferAmount} to ${recipient}`);
    setAmount('');
    setRecipient('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <p className="mb-4">Your balance: ${user.balance.toFixed(2)}</p>
      <h3 className="text-xl font-semibold mb-2">Transfer Funds</h3>
      <form onSubmit={handleTransfer} className="mb-4">
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-gray-700 text-sm font-bold mb-2">
            Recipient Username
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Transfer
        </button>
      </form>
      {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}
      <button
        onClick={onLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;