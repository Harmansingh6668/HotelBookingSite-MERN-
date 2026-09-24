import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

const CUSTOMER_ROLE = "CUSTOMER";

export const getCustomers = async () => {
  return apiClient(ENDPOINTS.usersByRole(CUSTOMER_ROLE));
};

export const getCustomerById = async (id) => {
  return apiClient(ENDPOINTS.userById(id));
};