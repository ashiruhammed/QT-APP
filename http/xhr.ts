import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://qt.organogram.app";

const $http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default $http;
