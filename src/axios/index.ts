import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000"
  /* other custom settings */
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.at;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);
// Add a response interceptor

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },

  function(error: any) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === "/login") {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("rt");
      return axiosInstance
        .post("/refresh", {
          refreshToken: refreshToken
        })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("at", res.data.newToken);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.newToken;

            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
