
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
const tableBody = document.getElementById("accountTableBody") as HTMLElement;


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
  upDate();
});


async function upDate(): Promise<void> {
  const response = await fetch(API_URL);
  const accounts: Account[] = await response.json();
  start(accounts);
}


function convert(dateString: string): number {
  const date = new Date(dateString.split('.').reverse().join('-'));
  return Math.floor(date.getTime() / 1000);
}


const formAcc = document.getElementById("formAcc") as HTMLFormElement | null;
formAcc?.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const account: Account = {
    id: Date.now().toString(),
    name: (document.getElementById("name") as HTMLInputElement).value,
    account_name: (document.getElementById("account_name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    status: (document.getElementById("status") as HTMLSelectElement).value as Account["status"],
    start_date: convert((document.getElementById("start_date") as HTMLInputElement).value),
    expiration_date: convert((document.getElementById("expiration_date") as HTMLInputElement).value),
  };

  await addAcc(account);
  wind.style.display = "none";
  formAcc.reset();
  upDate();
});


async function addAcc(account: Account): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  secondForm.style.display = "block";
}

async function updateAcc(id: string, account: Account): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  wind.style.display = "none";
  secondForm.style.display = "block";
}


async function deleteAcc(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}


function start(accounts: Account[]): void {
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
    button.addEventListener("click", Editing);
  });
}

async function handleDelete(event: Event): Promise<void> {
  const button = event.target as HTMLButtonElement;
  const id = button.closest("tr")?.getAttribute("data-id");

  if (id && window.confirm("Are you sure?")) {
    await deleteAcc(id);
    upDate();
  }
}

const form = document.getElementById("formAccEdit") as HTMLFormElement;
const secondForm = document.getElementById("formAcc") as HTMLFormElement;
async function Editing(event: Event): Promise<void> {
  secondForm.style.display = "none";

  const button = event.target as HTMLButtonElement;
  const id = button.closest("tr")?.getAttribute("data-id");

  if (!id) return;

  const account: Account = await fetch(`${API_URL}/${id}`).then(res => res.json());

  wind.style.display = "block";
  (document.getElementById("newName") as HTMLInputElement).value = account.name;
  (document.getElementById("account_newName") as HTMLInputElement).value = account.account_name;
  (document.getElementById("newEmail") as HTMLInputElement).value = account.email;
  (document.getElementById("newStatus") as HTMLSelectElement).value = account.status;
  (document.getElementById("newStart_date") as HTMLInputElement).value = new Date(account.start_date * 1000).toISOString().slice(0, 10);
  (document.getElementById("newExpiration_date") as HTMLInputElement).value = new Date(account.expiration_date * 1000).toISOString().slice(0, 10);

  form.onsubmit = async (event: Event) => {
    event.preventDefault();

    const updatedAcc: Account = {
      ...account,
      name: (document.getElementById("newName") as HTMLInputElement).value,
      account_name: (document.getElementById("account_newName") as HTMLInputElement).value,
      email: (document.getElementById("newEmail") as HTMLInputElement).value,
      status: (document.getElementById("newStatus") as HTMLSelectElement).value as Account["status"],
      start_date: new Date((document.getElementById("newStart_date") as HTMLInputElement).value).getTime() / 1000,
      expiration_date: new Date((document.getElementById("newExpiration_date") as HTMLInputElement).value).getTime() / 1000,
    };
    await updateAcc(id, updatedAcc);
    upDate();
    form.reset();
    form.onsubmit = null;
  };
}

const accBlock = document.getElementById("acc-block") as HTMLElement;
const aboutBlock = document.getElementById("about-block") as HTMLElement;
const acc = document.getElementById("acc") as HTMLElement;
const about = document.getElementById("about") as HTMLElement;
const mainBlock = document.getElementById("main-block") as HTMLElement;
const heat = document.getElementById("heat") as HTMLElement;

acc.addEventListener("click", accFun);
about.addEventListener("click", aboutFun);

function accFun(): void {
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

const openWindButton = document.getElementById("openWind") as HTMLElement;
const closeWindButton = document.getElementById("closeWind") as HTMLElement;
const wind = document.getElementById("wind") as HTMLElement;

openWindButton.addEventListener("click", () => {
  wind.style.display = "block";
  form.style.display = "none";
    secondForm.style.display = "block";
});

closeWindButton.addEventListener("click", () => {
  wind.style.display = "none";
  form.style.display = "block";
    secondForm.style.display = "none";
});

wind.addEventListener("click", (event: Event) => {
  if (event.target === wind) {
    wind.style.display = "none";
    form.style.display = "block";
  }
});


export default App;