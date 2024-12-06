import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const API_URL = "http://localhost:3000/accounts";
const tableBody = document.getElementById("body-table") as HTMLElement;


interface Account {
  id: string;
  name: string;
  account_name: string;
  email: string;
  status: "active" | "pending" | "disable";
  start_date: number;
  expiration_date: number;
}

document.addEventListener("DOMContentLoaded", () => {
  returnData();
});


async function returnData(): Promise<void> {
  const response = await fetch(API_URL);
  const accounts: Account[] = await response.json();
  renderProfiles(accounts);
}


function converterOfData(dateString: string): number {
  const date = new Date(dateString.split('.').reverse().join('-'));
  return Math.floor(date.getTime() / 1000);
}


const registrationForm = document.getElementById("registrationForm") as HTMLFormElement | null;
registrationForm?.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const account: Account = {
    id: Date.now().toString(),
    name: (document.getElementById("name") as HTMLInputElement).value,
    account_name: (document.getElementById("account_name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    status: (document.getElementById("status") as HTMLSelectElement).value as Account["status"],
    start_date: converterOfData((document.getElementById("start_date") as HTMLInputElement).value),
    expiration_date: converterOfData((document.getElementById("expiration_date") as HTMLInputElement).value),
  };

  await addProfile(account);
  modal.style.display = "none";
  registrationForm.reset();
  returnData();
});


async function addProfile(account: Account): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  secondForm.style.display = "block";
}

async function updateProfile(id: string, account: Account): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  modal.style.display = "none";
  secondForm.style.display = "block";
}


async function deleteProfile(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}


function renderProfiles(accounts: Account[]): void {
  tableBody.innerHTML = accounts.map(account => {
    let statusClass = "";
    switch (account.status.toLowerCase()) {
      case "active":
        statusClass = "active";
        break;
      case "pending":
        statusClass = "pending";
        break;
      case "disable":
        statusClass = "disable";
        break;
    }

    return `
        <tr data-id="${account.id}">
          <td>${account.name}</td>
          <td>${account.account_name}</td>
          <td>${account.email}</td>
          <td><div class="${statusClass} stat">${account.status}</div></td>
          <td>${new Date(account.start_date * 1000).toLocaleDateString()}</td>
          <td>${new Date(account.expiration_date * 1000).toLocaleDateString()}</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </td>
        </tr>
        `;
  }).join("");

  document.querySelectorAll<HTMLButtonElement>(".delete").forEach(button => {
    button.addEventListener("click", handleDelete);
  });

  document.querySelectorAll<HTMLButtonElement>(".edit").forEach(button => {
    button.addEventListener("click", handleEdit);
  });
}


async function handleDelete(event: Event): Promise<void> {
  const button = event.target as HTMLButtonElement;
  const id = button.closest("tr")?.getAttribute("data-id");

  if (id && window.confirm("Are you sure you want to delete this account?")) {
    await deleteProfile(id);
    returnData();
  }
}

const form = document.getElementById("editor") as HTMLFormElement;
const secondForm = document.getElementById("registrationForm") as HTMLFormElement;
async function handleEdit(event: Event): Promise<void> {
  secondForm.style.display = "none";

  const button = event.target as HTMLButtonElement;
  const id = button.closest("tr")?.getAttribute("data-id");

  if (!id) return;

  const account: Account = await fetch(`${API_URL}/${id}`).then(res => res.json());

  modal.style.display = "block";
  (document.getElementById("name1") as HTMLInputElement).value = account.name;
  (document.getElementById("account_name1") as HTMLInputElement).value = account.account_name;
  (document.getElementById("email1") as HTMLInputElement).value = account.email;
  (document.getElementById("status1") as HTMLSelectElement).value = account.status;
  (document.getElementById("start_date1") as HTMLInputElement).value = new Date(account.start_date * 1000).toISOString().slice(0, 10);
  (document.getElementById("expiration_date1") as HTMLInputElement).value = new Date(account.expiration_date * 1000).toISOString().slice(0, 10);
  form.onsubmit = async (event: Event) => {
    event.preventDefault();

    const updatedAccount: Account = {
      ...account,
      name: (document.getElementById("name1") as HTMLInputElement).value,
      account_name: (document.getElementById("account_name1") as HTMLInputElement).value,
      email: (document.getElementById("email1") as HTMLInputElement).value,
      status: (document.getElementById("status1") as HTMLSelectElement).value as Account["status"],
      start_date: new Date((document.getElementById("start_date1") as HTMLInputElement).value).getTime() / 1000,
      expiration_date: new Date((document.getElementById("expiration_date1") as HTMLInputElement).value).getTime() / 1000,
    };
    await updateProfile(id, updatedAccount);
    returnData();
    form.reset();
    form.onsubmit = null;
  };
}
const accBlock = document.getElementById("block_of_account") as HTMLElement;
const aboutBlock = document.getElementById("block-about") as HTMLElement;
const acc = document.getElementById("acc") as HTMLElement;
const about = document.getElementById("about") as HTMLElement;
const mainBlock = document.getElementById("block_of_main") as HTMLElement;
const heat = document.getElementById("heat") as HTMLElement;
acc.addEventListener("click", accountFunction);
about.addEventListener("click", aboutFun);
function accountFunction(): void {
  accBlock.style.display = "block";
  heat.style.display = "flex";
  aboutBlock.style.display = "none";
  acc.style.borderBottom = "3px solid orange";
  about.style.border = "none";
  mainBlock.style.width = "70%";
}
function aboutFun(): void {
  accBlock.style.display = "none";
  aboutBlock.style.display = "flex";
  heat.style.display = "none";
  about.style.borderBottom = "3px solid orange";
  acc.style.border = "none";
  mainBlock.style.width = "55%";
}
const op_windowButton = document.getElementById("op_window") as HTMLElement;
const closeModalButton = document.getElementById("closeModal") as HTMLElement;
const modal = document.getElementById("modal") as HTMLElement;
op_windowButton.addEventListener("click", () => {
  modal.style.display = "block";
  form.style.display = "none";
    secondForm.style.display = "block";
});
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  form.style.display = "block";
    secondForm.style.display = "none";
});
modal.addEventListener("click", (event: Event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    form.style.display = "block";
  }
});
export default App;
