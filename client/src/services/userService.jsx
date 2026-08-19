import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const getDemoUser = async () => (await axios.get(`${API_URL}/demo`)).data;
export const updateUser = async (id, user) => (await axios.put(`${API_URL}/${id}`, user)).data;
