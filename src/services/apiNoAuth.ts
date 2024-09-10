import axios from "axios";

const apiNoAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiNoAuth;
