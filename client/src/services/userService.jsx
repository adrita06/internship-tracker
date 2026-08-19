import api from "./api";
const RESOURCE = "/users";

export const getMe = async () => (await api.get(`${RESOURCE}/me`)).data;
export const updateMe = async (updates) => (await api.put(`${RESOURCE}/me`, updates)).data;