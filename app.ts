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
  console.log("DOM полностью загружен и разобран!");
  fetchAccounts();
});


async function fetchAccounts(): Promise<void> {
  const response = await fetch(API_URL);
  const accounts: Account[] = await response.json();
  renderAccounts(accounts);
}


function dataConvert(dateString: string): number {
  const date = new Date(dateString.split('.').reverse().join('-'));
  return Math.floor(date.getTime() / 1000);
}


const accountForm = document.getElementById("accountForm") as HTMLFormElement | null;
accountForm?.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const account: Account = {
    id: Date.now().toString(),
    name: (document.getElementById("name") as HTMLInputElement).value,
    account_name: (document.getElementById("account_name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    status: (document.getElementById("status") as HTMLSelectElement).value as Account["status"],
    start_date: dataConvert((document.getElementById("start_date") as HTMLInputElement).value),
    expiration_date: dataConvert((document.getElementById("expiration_date") as HTMLInputElement).value),
  };

  await addAccount(account);
  modal.style.display = "none";
  accountForm.reset();
  fetchAccounts();
});


async function addAccount(account: Account): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  secondForm.style.display = "block";
}

async function updateAccount(id: string, account: Account): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  modal.style.display = "none";
  secondForm.style.display = "block";
}


async function deleteAccount(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}


function renderAccounts(accounts: Account[]): void {
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

  if (id && confirm("Are you sure you want to delete this account?")) {
    await deleteAccount(id);
    fetchAccounts();
  }
}

const form = document.getElementById("accountFormEdit") as HTMLFormElement;
const secondForm = document.getElementById("accountForm") as HTMLFormElement;
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
    await updateAccount(id, updatedAccount);
    fetchAccounts();
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

const openModalButton = document.getElementById("openModal") as HTMLElement;
const closeModalButton = document.getElementById("closeModal") as HTMLElement;
const modal = document.getElementById("modal") as HTMLElement;

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
  form.style.display = "none";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  form.style.display = "block";
});

modal.addEventListener("click", (event: Event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    form.style.display = "block";
  }
});
