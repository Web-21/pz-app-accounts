import React from 'react';
import { useParams } from 'react-router-dom';
import accountsData from '../db/db.accounts.json';

const AccountDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const account = accountsData.accounts.find(acc => acc.id === parseInt(id!));

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <h1>{account.name}</h1>
      <p>Account Name: {account.account_name}</p>
      <p>Email: {account.email}</p>
      <p>Status: {account.status}</p>
    </div>
  );
};

export default AccountDetails;
