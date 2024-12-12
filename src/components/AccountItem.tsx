import React from 'react';

interface AccountItemProps {
  account: { id: number; name: string; balance: number };
}

const AccountItem: React.FC<AccountItemProps> = ({ account }) => {
  return (
    <li>
      {account.name} - Balance: ${account.balance}
    </li>
  );
};

export default AccountItem;
