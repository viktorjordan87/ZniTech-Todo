import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API, // Set your base URL
    withCredentials: true,
  });

  // Add an interceptor to attach
  instance.interceptors.request.use(async (config) => {
    try {
      //
    } catch (error) {
      console.error("Failed to retrieve access token:", error);
    }

    return config;
  });

  // const creditentialsExpired = async () => {
  // console.log("logout 401");
  // };

  // response
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response.status === 401) {
        // console.log("logout 401");
        // creditentialsExpired();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const apiClient = createAxiosInstance();

export { apiClient };
