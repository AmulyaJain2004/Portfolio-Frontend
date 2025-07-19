const LOCAL_API_URL = "http://localhost:8000"; // Change as needed
const PROD_API_URL = import.meta.env.VITE_API_BASE_URL;

const apiBaseUrl =
  import.meta.env.MODE === "development" ? LOCAL_API_URL : PROD_API_URL;

export default {
  apiBaseUrl,
}; 