import { api } from "@/utils/axiosConfig";
import { handleApiError } from "./error";

/**
 * Normalizes backend responses where paginated/data payloads
 * are wrapped inside `{ success: true, message: '...', data: { results: [...], count: 123 } }`.
 * Preserves all original keys while hoisting `results`, `count`, etc.
 */
export const normalizeAdminResponse = (res: any) => {
  if (res?.data && typeof res.data === "object" && !Array.isArray(res.data)) {
    return {
      ...res,
      ...res.data,
      results: res.data.results ?? res.results,
      count: res.data.count ?? res.count,
    };
  }
  return res;
};

// Bookings
export const getAdminBookings = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/bookings/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminBookingDetail = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/bookings/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminBooking = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/bookings/${id}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const approveAdminBooking = async (id: string) => {
  try {
    const response = await api.patch(`/api/admin/bookings/${id}/approve/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const refundAdminBooking = async (id: string, data: { refund_percent: number }) => {
  try {
    const response = await api.patch(`/api/admin/bookings/${id}/refund/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Conversations
export const getAdminConversations = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/conversations/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminConversationDetail = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/conversations/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAdminConversationReply = async (id: string, data: { message: string; [key: string]: any }) => {
  try {
    const response = await api.post(`/api/admin/conversations/${id}/reply/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Service Categories
export const createAdminService = async (data: any) => {
  try {
    const response = await api.post("/api/admin/service/", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAdminService = async (id: string, data: any) => {
  try {
    const response = await api.put(`/api/admin/service/${id}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminService = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/service/${id}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAdminService = async (id: string) => {
  try {
    const response = await api.delete(`/api/admin/service/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Supports
export const getAdminSupports = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/supports/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminSupportDetail = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/supports/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminSupport = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/supports/${id}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminSupportAction = async (id: string, adminAction: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/supports/${id}/${adminAction}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const assignAdminSupport = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/supports/${id}/assign/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Users
export const getAdminUsers = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/users/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminUserDetail = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/users/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminUser = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/users/${id}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAdminUser = async (id: string) => {
  try {
    const response = await api.delete(`/api/admin/users/${id}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const patchAdminUserAction = async (id: string, adminAction: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/users/${id}/${adminAction}/`, data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAdminUserAction = async (id: string, adminAction: string) => {
  try {
    const response = await api.delete(`/api/admin/users/${id}/${adminAction}/`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminUserReferrals = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/users/${id}/referrals/`);
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

// Referral Withdrawals
export const getAdminReferralWithdrawals = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/referral-withdrawals/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const approveAdminReferralWithdrawal = async (id: string, data?: any) => {
  try {
    const response = await api.patch(`/api/admin/referral-withdrawals/${id}/approve/`, data || {});
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const rejectAdminReferralWithdrawal = async (id: string, data?: any) => {
  try {
    const response = await api.patch(`/api/admin/referral-withdrawals/${id}/reject/`, data || {});
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Application Categories
export const getAdminApplicationCategories = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/application/category/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error: any) {
    console.error("getAdminApplicationCategories error:", error.response?.data || error.message);
    throw error;
  }
};

export const createAdminApplicationCategory = async (data: { name: string; [key: string]: any }) => {
  try {
    const response = await api.post("/api/admin/application/category/", data);
    return response?.data;
  } catch (error: any) {
    console.error("createAdminApplicationCategory error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateAdminApplicationCategory = async (id: string, data: { name: string; [key: string]: any }) => {
  try {
    const response = await api.put(`/api/admin/application/category/${id}/`, data);
    return response?.data;
  } catch (error: any) {
    console.error("updateAdminApplicationCategory error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAdminApplicationCategory = async (id: string) => {
  try {
    const response = await api.delete(`/api/admin/application/category/${id}/`);
    return response?.data;
  } catch (error: any) {
    console.error("deleteAdminApplicationCategory error:", error.response?.data || error.message);
    throw error;
  }
};

// Service Categories (list endpoint: GET /api/v1/services-categories/)
export const getAdminServiceCategories = async (params?: any) => {
  try {
    const response = await api.get("/api/v1/services-categories/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error: any) {
    console.error("getAdminServiceCategories error:", error.response?.data || error.message);
    throw error;
  }
};

// Jobs (External Applications)
export const getAdminJobs = async (params?: any) => {
  try {
    const response = await api.get("/api/admin/application/external/", { params });
    return normalizeAdminResponse(response?.data);
  } catch (error: any) {
    console.error("getAdminJobs error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAdminJobDetail = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/application/external/${id}/`);
    return response?.data;
  } catch (error: any) {
    console.error("getAdminJobDetail error:", error.response?.data || error.message);
    throw error;
  }
};

export const createAdminJob = async (data: any) => {
  try {
    const response = await api.post("/api/admin/application/external/", data);
    return response?.data;
  } catch (error: any) {
    console.error("createAdminJob error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateAdminJob = async (id: string, data: any) => {
  try {
    const response = await api.put(`/api/admin/application/external/${id}/`, data);
    return response?.data;
  } catch (error: any) {
    console.error("updateAdminJob error:", error.response?.data || error.message);
    throw error;
  }
};

export const patchAdminJob = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/api/admin/application/external/${id}/`, data);
    return response?.data;
  } catch (error: any) {
    console.error("patchAdminJob error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAdminJob = async (id: string) => {
  try {
    const response = await api.delete(`/api/admin/application/external/${id}/`);
    return response?.data;
  } catch (error: any) {
    console.error("deleteAdminJob error:", error.response?.data || error.message);
    throw error;
  }
};
