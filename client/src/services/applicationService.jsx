import api from "./api";
const RESOURCE = "/applications";

export const getApplications = async () => (await api.get(RESOURCE)).data;
export const getApplication = async (id) => (await api.get(`${RESOURCE}/${id}`)).data;
export const createApplication = async (application) => (await api.post(RESOURCE, application)).data;
export const updateApplication = async (id, application) => (await api.put(`${RESOURCE}/${id}`, application)).data;
export const deleteApplication = async (id) => (await api.delete(`${RESOURCE}/${id}`)).data;