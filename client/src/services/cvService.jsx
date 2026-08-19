import api from "./api";
const RESOURCE = "/cvs";

export const getCVs = async () => (await api.get(RESOURCE)).data;
export const getCV = async (id) => (await api.get(`${RESOURCE}/${id}`)).data;
export const createCV = async (cv) => {
  const response = await api.post(RESOURCE, cv);
  return response.data;
};
export const updateCV = async (id, cv) => (await api.put(`${RESOURCE}/${id}`, cv)).data;
export const deleteCV = async (id) => (await api.delete(`${RESOURCE}/${id}`)).data;