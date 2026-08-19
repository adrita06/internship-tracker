import api from "./api";
export const calculateFitScore = async (data) => (await api.post("/fitscore", data)).data;