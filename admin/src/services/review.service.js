import { apiClient } from "./api/client";

export const getAdminReviews = async () => {
  return apiClient("/admin/reviews");
};

export const getAdminReviewById = async (id) => {
  return apiClient(`/admin/reviews/${id}`);
};

export const deleteAdminReview = async (id) => {
  return apiClient(`/admin/reviews/${id}`, {
    method: "DELETE",
  });
};