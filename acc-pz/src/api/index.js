import axios from 'axios';

const BASE_URL = 'http://localhost:3000/accounts';

// Отримання всіх облікових записів
export const getAccounts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

// Отримання облікового запису за ID
export const getAccountById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching account with ID ${id}:`, error);
    throw error;
  }
};

// Створення нового облікового запису
export const createAccount = async (account) => {
  try {
    const response = await axios.post(BASE_URL, account);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// Оновлення облікового запису (повне)
export const updateAccount = async (id, account) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, account);
    return response;
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    throw error;
  }
};

// Оновлення облікового запису (часткове)
export const patchAccount = async (id, partialAccount) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, partialAccount);
    return response.data;
  } catch (error) {
    console.error(`Error patching account with ID ${id}:`, error);
    throw error;
  }
};

// Видалення облікового запису
export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting account with ID ${id}:`, error);
    throw error;
  }
};
