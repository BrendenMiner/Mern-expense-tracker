import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserfromStorage } from "../../utils/getUserfromStorage";

const token = getUserfromStorage();

//add
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `${BASE_URL}/categories/create`,
    {
      name,
      type,
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
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //RaP
  return response.data;
};

//list
export const listCategoriesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/categories/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //RaP
  return response.data;
};
