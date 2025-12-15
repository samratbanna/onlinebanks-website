import { create } from "apisauce";
import { apiMonitor } from "./monitor";
import { BASE_URL } from "../../../env"

export const URIS = {
  /* Authentication */

  GET_CATEGORY: "/category/public",
  GET_PRODUCT:"/product/public-all",
  GET_APP_DETAIL:"/app-version",
  GET_TEAM:"/team/all",
  CREATE_LEAD:"/lead/public"
};

let api = create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  timeout: 6000,
});
api.addMonitor(apiMonitor);

api.axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;
    let isunauth = error.response && error.response.status === 401;
    if (isunauth && !originalRequest._retry && !originalRequest.headers._retry) {
      originalRequest._retry = true;
    } else {
      return Promise.resolve(error);
    }
  }
);

export const setAuthorizationHeader = (access_token) => {
  if (!access_token) delete api.headers["Authorization"];
  else api.setHeader("Authorization", "Bearer " + access_token);
};

export const setSessionHeader = (session) => {
  if (!session) delete api.headers["session"];
  else api.setHeader("session", session);
};

export const removeAuthorizationHeader = () => {
  delete api.headers["Authorization"];
};

export const setUserAgent = (info) => api.setHeader("device", info);

export { api as apiClient };
