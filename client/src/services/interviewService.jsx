import api from "./api";
const RESOURCE = "/interview-questions";

export const getQuestions = async (filters = {}) => (await api.get(RESOURCE, { params: filters })).data;
export const getQuestion = async (id) => (await api.get(`${RESOURCE}/${id}`)).data;
export const createQuestion = async (q) => (await api.post(RESOURCE, q)).data;
export const updateQuestion = async (id, q) => (await api.put(`${RESOURCE}/${id}`, q)).data;
export const deleteQuestion = async (id) => (await api.delete(`${RESOURCE}/${id}`)).data;
export const getReadiness = async () => (await api.get(`${RESOURCE}/readiness`)).data;