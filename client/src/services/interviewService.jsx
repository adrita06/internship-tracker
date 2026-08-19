import axios from "axios";

const API_URL = "http://localhost:3000/api/interview-questions";

export const getQuestions = async (filters = {}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await axios.post(API_URL, question);
  return response.data;
};

export const updateQuestion = async (id, question) => {
  const response = await axios.put(`${API_URL}/${id}`, question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getReadiness = async () => {
  const response = await axios.get(`${API_URL}/readiness`);
  return response.data;
};
