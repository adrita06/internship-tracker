import axios from "axios";

const API_URL = "http://localhost:3000/api/companies";

export const getCompanies = async () => (await axios.get(API_URL)).data;
export const getCompany = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const createCompany = async (company) => (await axios.post(API_URL, company)).data;
export const updateCompany = async (id, company) => (await axios.put(`${API_URL}/${id}`, company)).data;
export const deleteCompany = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
