import axios from "axios";
import { baseUrl } from "../shared/api-paths";

export default axios.create({
  baseURL: baseUrl,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers:{'Content-Type': 'application/json'},
  
});
