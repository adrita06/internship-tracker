import axios from "axios";

const API_URL = "http://localhost:3000/api/applications";

export const getApplications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getApplication = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createApplication = async (application) => {
  const response = await axios.post(API_URL, application);
  return response.data;
};

export const updateApplication = async (id, application) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    application
  );

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};