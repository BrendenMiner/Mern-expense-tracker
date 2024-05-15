import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserfromStorage } from "../../utils/getUserfromStorage";

const token = getUserfromStorage();

//add
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transaction/create`,
    {
      type,
      amount,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //RaP
  return response.data;
};

//update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //RaP
  return response.data;
};

//delete
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //RaP
  return response.data;
};

//list
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(`${BASE_URL}/transaction/list`, {
    params: { category, type, startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //RaP
  return response.data;
};
