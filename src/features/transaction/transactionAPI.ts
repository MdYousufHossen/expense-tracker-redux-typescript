import axios from "../../utils/axios";
import { transactionType } from "./transactionSlice";

export const getTransactions = async (
  search: string | undefined,
  type: string | undefined,
  page: number | undefined,
  limit: number | undefined
) => {
  let queryString = "";

  if (type) {
    queryString += `type_like=${type}`;
  }
  if (search) {
    queryString += `&q=${search}`;
  }
  if (page) {
    queryString += `&_page=${page}&_limit=${limit}`;
  }

  const response = await axios.get(`/transaction/?${queryString}`);
  return {
    totalItem: response.headers["x-total-count"],
    transactions: response.data,
  };
};

export const addTransaction = async (data: transactionType) => {
  const response = await axios.post(`/transaction`, data);
  return response.data;
};

export const editTransaction = async (id: number, data: transactionType) => {
  const response = await axios.put(`/transaction/${id}`, data);
  return response.data;
};

export const removeTransaction = async (id: number) => {
  const response = await axios.delete(`/transaction/${id}`);
  return response.data;
};
