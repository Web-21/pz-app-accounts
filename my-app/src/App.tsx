import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}
const API_URL = "http://localhost:3000/accounts";
const tableBody = document.getElementById("accountTableBody") as HTMLElement;
interface Account {
  id: string;
  accountholdername: string;
  account_accountholdername: string;
  email: string;
  status: "active" | "pending" | "disable";
  start_date: number;
  expiration_date: number;
}
document.addEventListener("DOMContentLoaded", () => {AccountManager();});
async function AccountManager(): Promise<void> {
  const response = await fetch(API_URL);
  const accounts: Account[] = await response.json();
  AccountView(accounts);
}
function AccountView(accounts: Account[]): void {
  if (!tableBody) {
    console.error("Table body element not found");
    return;
  }

  tableBody.innerHTML = accounts
    .map((account) => {
      const statusClass = account.status ? account.status.toLowerCase() : "unknown";
      return `
        <tr data-id="${account.id}">
          <td>${account.accountholdername || "N/A"}</td>
          <td>${account.account_accountholdername || "N/A"}</td>
          <td>${account.email || "N/A"}</td>
          <td><div class="${statusClass} stat">${account.status || "N/A"}</div></td>
          <td>${account.start_date ? new Date(account.start_date * 1000).toLocaleDateString() : "N/A"}</td>
          <td>${account.expiration_date ? new Date(account.expiration_date * 1000).toLocaleDateString() : "N/A"}</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </td>
        </tr>
      `;
    })
    .join("");

  document.querySelectorAll(".edit").forEach((button) =>
    button.addEventListener("click", (event) => {
      const id = (event.target as HTMLElement).closest("tr")?.getAttribute("data-id");
      if (id) console.log(`Edit account with ID: ${id}`);
    })
  );

}
const accountsBlock = document.getElementById("main-block") as HTMLElement;
const aboutBlock = document.getElementById("about-block") as HTMLElement;
const account = document.getElementById("account") as HTMLElement;
const about = document.getElementById("about-us") as HTMLElement;

account.addEventListener("click", acountsFun);
about.addEventListener("click", aboutFun);

function acountsFun(): void {
  accountsBlock.style.display = "block";
  aboutBlock.style.display = "none";
  account.style.borderBottom = "3px solid orange";
  about.style.border = "none";
}

function aboutFun(): void {
  accountsBlock.style.display = "none";
  aboutBlock.style.display = "flex";
  about.style.borderBottom = "3px solid orange";
  account.style.border = "none";
}
const modal = document.getElementById("modal") as HTMLElement;
export default App;