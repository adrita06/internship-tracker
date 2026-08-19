import api from "./api";
const RESOURCE = "/companies";

export const getCompanies = async () => (await api.get(RESOURCE)).data;
export const getCompany = async (id) => (await api.get(`${RESOURCE}/${id}`)).data;
export const createCompany = async (company) => (await api.post(RESOURCE, company)).data;
export const updateCompany = async (id, company) => (await api.put(`${RESOURCE}/${id}`, company)).data;
export const deleteCompany = async (id) => (await api.delete(`${RESOURCE}/${id}`)).data;