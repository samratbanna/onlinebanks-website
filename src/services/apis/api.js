import { URIS, apiClient } from ".";

export const apis = {
  /* Auth */
  getCategoryApi: (payload) => apiClient.get(URIS.GET_CATEGORY, payload),
  getProductApi: (payload) => apiClient.get(URIS.GET_PRODUCT, payload),
  getAppDetailApi: (payload) => apiClient.get(URIS.GET_APP_DETAIL, payload),
  getTeamApi: (payload) => apiClient.get(URIS.GET_TEAM, payload),
  createLeadApi: (payload) => apiClient.post(URIS.CREATE_LEAD, payload)
};
