import React, { useState } from 'react';
import accountsData from '../../db/db.accounts.json';
import './MainPage.css';
import ModalFormComponent from '../../components/Modal/ModalFormComponent';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [accounts, setAccounts] = useState(accountsData.accounts);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<any>(null);

  const handleAccountSave = (data: any) => {
    if (editAccount) {
      setAccounts(accounts.map(acc =>
        (acc.id === editAccount.id ? { ...acc, ...data } : acc)));
    } else {
      const newAccount = { ...data, id: (accounts[accounts.length - 1].id) + 1, status: "Active"};
      setAccounts([...accounts, newAccount]);
    }
    setEditAccount(null);
  };

  const handleAccountEdit = (account: any) => {
    setEditAccount(account);
    setIsModalFormOpen(true);
  };

  const handleAccountDelete = (id: number) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const handleAccountCreate = () => {
    setEditAccount(null);
    setIsModalFormOpen(true);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3 me-1">
        <h1>Accounts</h1>
        <button className="btn btn-primary" onClick={handleAccountCreate}>Create Account</button>
      </div>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Account name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Start date</th>
          <th scope="col">Expiration date</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {accounts.map(account => (
          <tr key={account.id}>
            <th scope="row">{account.id}</th>
            <td><Link to={`/accounts/${account.id}`} className={"acc-link text-black"}>{account.name}</Link></td>
            <td>{account.account_name}</td>
            <td>{account.email}</td>
            <td>
              <button
                className={`btn p-1 ${
                  account.status === 'Active'
                    ? 'btn-secondary'
                    : account.status === 'Pending'
                      ? 'btn-warning'
                      : 'btn-danger'
                }`}
              >
                {account.status}
              </button>
            </td>
            <td>{new Date(Number(account.start_date) * 1000).toLocaleDateString('en-GB')}</td>
            <td>{new Date(Number(account.expiration_date) * 1000).toLocaleDateString('en-GB')}</td>
            <td className="d-flex align-items-center justify-content-end">
              <button className="btn btn-primary" onClick={() => handleAccountEdit(account)}>Edit</button>
              <button className="btn btn-secondary ms-2" onClick={() => handleAccountDelete(account.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <ModalFormComponent
        isOpen={isModalFormOpen}
        onRequestClose={() => setIsModalFormOpen(false)}
        onSave={handleAccountSave}
        initialData={editAccount}
      />
    </div>
  );
};

export default MainPage;
