import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountItem from './AccountItem';
import './styles.css';


interface Account {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get<Account[]>('http://localhost:3000/accounts');
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch accounts');
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);


  return (
    <div className="account-list-container">
      <header className="header">
        <h1>Account List</h1>
        <button className="btn">Create Account</button>
      </header>


      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="summary">Total: {accounts.length}</div>
          <table className="account-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <AccountItem key={account.id} account ={account} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AccountList;
