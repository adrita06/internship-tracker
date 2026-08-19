import axios from "axios";

// withCredentials is essential - without it the browser won't send
// the HttpOnly auth cookie, and every protected route 401s.
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;