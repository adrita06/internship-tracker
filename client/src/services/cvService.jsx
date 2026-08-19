import axios from "axios";

const API_URL = "http://localhost:3000/api/cvs";

export const getCVs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCV = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCV = async (cv) => {
  const response = await axios.post(API_URL, cv, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCV = async (id, cv) => {
  const response = await axios.put(`${API_URL}/${id}`, cv);
  return response.data;
};

export const deleteCV = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
