import React from 'react';
import {useParams} from 'react-router-dom';
import accountsData from '../../db/db.accounts.json';
import './AccountPage.css'

const AccountPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const account = accountsData.accounts.find(acc => acc.id === parseInt(id!));

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <>
      <div className="gradient"/>
      <div className="container mt-3">
        <h1 className={"account-header"}>{account.name}</h1>
        <p><span className={"text-warning"}>
          Name:</span> {account.account_name}</p>
        <p><span className={"text-warning"}>
          Account Name:</span> {account.account_name}</p>
        <p><span className={"text-warning"}>
          Email:</span> {account.email}</p>
        <p><span className={"text-warning"}>
          Status:</span> {account.status}</p>
        <p><span
          className={"text-warning"}>
          Start date:</span> {new Date(Number(account.start_date) * 1000).toLocaleDateString('en-GB')}
        </p>
        <p><span
          className={"text-warning"}>
          Expiration date:</span> {new Date(Number(account.expiration_date) * 1000).toLocaleDateString('en-GB')}
        </p>
      </div>
    </>
  );
};

export default AccountPage;
