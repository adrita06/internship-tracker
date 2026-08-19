import axios from "axios";

const API_URL = "http://localhost:3000/api/fitscore";

export const calculateFitScore = async (fitScoreData) => {
  const response = await axios.post(API_URL, fitScoreData);
  return response.data;
};
