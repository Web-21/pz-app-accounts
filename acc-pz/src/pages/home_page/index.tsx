import React, { useEffect, useState } from "react";
import "./style.css";
import { DataTable } from "../../components/table";
import type { ColumnsType } from "antd/es/table";
import { ModalWindow } from "../../components/modal/index.js";

import * as api from "../../api/index.js";

interface DataType {
  key: string;
  name: string;
  account_name: string;
  email: string;
  status: string;
  start_date: string;
  expiration_date: string;
}

export const MainPage = () => {
  const [data, setData] = useState([] as DataType[]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("Create Account");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAccounts();
        const formattedData = response.map((item: any) => ({
          ...item,
          key: item.id, 
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (key: string) => {
    try {
      await api.deleteAccount(key);
      setData((prevData) => prevData.filter((item) => item.key !== key));
    } catch (error) {
      console.error(`Error deleting record with key: ${key}`, error);
    }
  };

  const handleAddAccount = (newAccount: DataType) => {
    setData((prevData) => [...prevData, newAccount]);
  };

  const handleOpenModal = (edit, editAccount) => { 
    if (edit) {
        localStorage.setItem("account", JSON.stringify(editAccount))
        setTitle("Edit Account");
    } else {
        localStorage.removeItem("account")
        setTitle("Create Account");
    }
    setIsModalOpen(true)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNameClick = (record: DataType) => {
    localStorage.setItem("selectedRow", JSON.stringify(record));
    console.log("Saved to localStorage:", record);
    window.location.href = "/profile"
};

  const columns: ColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: DataType) => (
            <span
                onClick={() => handleNameClick(record)}
                className="clickable-name"
            >
                {text}
            </span>
        ),
    },
    {
      title: "Account Name",
      dataIndex: "account_name",
      key: "account_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        let statusClass = "";
        switch (status) {
          case "Active":
            statusClass = "iav-status actived";
            break;
          case "Disable":
            statusClass = "iav-status disable";
            break;
          case "Pending":
            statusClass = "iav-status pending";
            break;
          default:
            statusClass = "";
        }
        return <span className={`iav-status ${statusClass}`}>{status}</span>;
      },
    },
    {
      title: "Start Date",
      key: "start_date",
      dataIndex: "start_date",
      render: (date: string) =>
        new Date(Number(date) * 1000).toLocaleDateString(),
    },
    {
      title: "Expiration Date",
      key: "expiration_date",
      dataIndex: "expiration_date",
      render: (date: string) =>
        new Date(Number(date) * 1000).toLocaleDateString(),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: DataType) => (
        <div className="iav-btn-cont">
            <button className="iav-edit-btn" onClick={() => handleOpenModal(true, record)}>
                Edit
            </button>
            <button
                className="iav-delete-btn"
                onClick={() => handleDelete(record.key)}
            >
                Delete
            </button>
        </div>
      ),
    },
  ];

  return (
    <main className="iav-main">
      <div className="iav-container">
        <div className="iav-create-acc">
          <h1>Account List</h1>
          <button onClick={() => handleOpenModal(false, null)}>Create account</button>
        </div>
        <div className="iav-stats">
          <p>Total: {`${data.length}`}</p>
        </div>
        <DataTable columns={columns} loading={loading} data={data} />
      </div>

      {isModalOpen && (
        <ModalWindow
          title={title}
          onClose={handleCloseModal}
          onSave={handleAddAccount} 
        />
      )}
    </main>
  );
};
