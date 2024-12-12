import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const AccountForm: React.FC = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState<number | string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:3000/accounts', { name, balance });
      setSuccess(true);
      setName('');
      setBalance('');
    } catch (err) {
      setError('Failed to add account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-form-container">
      <h2>Add New Account</h2>


      {error && <div className="error">{error}</div>}
      {success && <div className="success">Account added successfully!</div>}
      {loading && <div className="spinner">Loading...</div>}

      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label htmlFor="name">Account Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter account name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="balance">Balance</label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            placeholder="Enter balance"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Account'}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
