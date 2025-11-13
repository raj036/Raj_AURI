// src/utils/apiService.js
import axios from "axios";

// Make sure base URL is correctly set from .env (no trailing slashes)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  // withCredentials: true, // 🔥 Required for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// No token — remove request interceptor
// You can keep the response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    console.error("❌ API Error:", {
      url,
      method: error.config?.method,
      status,
      data: error.response?.data,
    });

    if (status === 403) {
      console.warn(
        "🚫 Access forbidden (403) — the server is rejecting the request."
      );
    }

    return Promise.reject(error);
  }
);

//change done with gpt to add token to request header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  console.log("🔑 Token before API call:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls

export const loginUser = (email, password) =>
  axiosInstance.post("/api/v1/login", { email, password });
// axiosInstance.post("https://2dc6f6b46585.ngrok-free.app/", { email, password });

export const fetchInventoryDetails = () => axiosInstance.get("/inventory/all");

export const fetchUserManagement = () =>
  axiosInstance.get("/api/v1/users");

export const addProduct = (productData) =>
  axiosInstance.post("/inventory", productData);

//Get all branches
// export const fetchBranches = () => axiosInstance.post("/branch/filter");

export const fetchBranches = (filters = {}) =>
  axiosInstance.post("/branch/filter", filters);

// Add a new branch
export const addBranch = (newBranch) =>
  axiosInstance.post("/branch", newBranch);

// Update branch details
export const updateBranch = (branchId, updatedData) =>
  axiosInstance.put(`/branch/update`, { branchId, ...updatedData });

// Delete a branch
// export const deleteBranch = (branchId) =>
//   axiosInstance.delete(`/branches/delete`, { data: { branchId } });

export const deleteBranch = async (branch) => {
  try {
    const response = await axiosInstance.delete("/branch/delete", {
      data: { id: branch.id }, // ✅ send JSON body { id: 2 }
    });
    console.log("✅ Branch deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting Branch:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const addCompanyInformation = async (data) =>
  axiosInstance.post("/company", data);


//Fetch company Information
export const fetchCompanyInformation = (id) =>
  axiosInstance.get(`/company`, { params: { id } });

export const updateCompanyInformation = (id) =>
  axiosInstance.get(`/company`, { params: { id } });

export const addUserSubcription = (subscriptionData) =>
  axiosInstance.post("/api/v1/subscription/addUserSubscription", subscriptionData);

export const addServices = async (serviceData) => {
  try {
    const response = await axiosInstance.post("/service", serviceData);
    console.log("✅ Service added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding service:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// export const updateServices = (serviceID, updatedData) =>
//   axiosInstance.put(`/service/update`, {serviceID, ...updatedData} );

// ✅ UPDATE Service
export const updateServices = async (serviceId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/service/update`, {
      serviceId, // ✅ correct key
      ...updatedData, // must match backend expectations
    });
    console.log("✅ Service updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating service:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const fetchServices = (filters = {}) =>
  axiosInstance.post("/service/filter", filters);

export const deleteServices = async (service) => {
  try {
    const response = await axiosInstance.delete("/service/delete", {
      data: { id: service.id }, // ✅ send JSON body { id: 2 }
    });
    console.log("✅ Branch deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting Service:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const fetchTaxData = () => axiosInstance.get("/tax/all");

export const addTax = (data) => axiosInstance.post("/tax", data);

export const updateTax = (taxData) => {
  return axiosInstance.put("/tax/update", taxData);
};

export const deleteTax = async (tax) => {
  try {
    const response = await axiosInstance.delete("/tax/delete", {
      data: { id: tax.id }, // ✅ send JSON body { id: 2 }
    });
    console.log("✅ Tax deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting tax:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Get all users
export const fetchUsers = async () => {
  const response = await axiosInstance.get("/api/v1/users");
  return response.data;
};

// ✅ Add new user
export const createUser = async (userData) => {
  const response = await axiosInstance.post("/api/v1/users", userData);
  return response.data;
};

// ✅ Update existing user
export const updateUser = async (userData) => {
  const response = await axiosInstance.put("/api/v1/users", userData);
  return response.data;
};


// ✅ Delete user (backend expects id in body)
export const deleteUser = async (userData) => {
  const response = await axiosInstance.delete("/api/v1/users", {
    data: { id: userData.id },
  });
  return response.data;
};

export const fetchTask = () => axiosInstance.get("/api/v1/tasks");

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/api/v1/task", taskData);
  return response.data;
};

// Quatation API

export const fetchQuotations = () => axiosInstance.get("/api/quotations/all");

export const createQuotation = (quotationData) =>
  axiosInstance.post("/api/quotations/", quotationData);

export const updateQuotation = (id, quotationData) =>
  axiosInstance.put(`/api/quotations/${id}`, quotationData);

export const deleteQuotation = (id) =>
  axiosInstance.delete(`/api/quotations/${id}`);

export default axiosInstance;
