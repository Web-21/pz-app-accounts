import React, { useState } from 'react';
import accountsData from '../db/db.accounts.json';
import Modal from '../components/Modal/Modal';
import { Link } from 'react-router-dom';

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState(accountsData.accounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<any>(null);

  // Функція збереження акаунта
  const handleSave = (data: any) => {
    if (editAccount) {
      setAccounts(accounts.map(acc => (acc.id === editAccount.id ? { ...acc, ...data } : acc)));
    } else {
      const newAccount = { ...data, id: (accounts[accounts.length - 1].id) + 1, status: "Active"}; // Генеруємо ID для нового акаунта
      setAccounts([...accounts, newAccount]);
    }
    setEditAccount(null); // Скидаємо стан для редагування акаунта
  };

  // Функція редагування акаунта
  const handleEdit = (account: any) => {
    setEditAccount(account); // Встановлюємо акаунт для редагування
    setIsModalOpen(true); // Відкриваємо модальне вікно
  };

  // Функція для видалення акаунта
  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  // Відкриття модального вікна для створення нового акаунта
  const handleCreate = () => {
    setEditAccount(null); // Очистити поля для нового акаунта
    setIsModalOpen(true); // Відкрити модальне вікно
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3 me-1">
        <h1>Accounts</h1>
        <button className="btn btn-primary" onClick={handleCreate}>Create Account</button>
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
            <td><Link to={`/account/${account.id}`}>{account.name}</Link></td>
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
              <button className="btn btn-primary" onClick={() => handleEdit(account)}>Edit</button>
              <button className="btn btn-secondary ms-2" onClick={() => handleDelete(account.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editAccount}
      />
    </div>
  );
};

export default AccountList;
