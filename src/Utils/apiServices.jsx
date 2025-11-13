// src/utils/apiService.js
import axios from "axios";

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



// aayush code 

export const addCustomers = async (customersData) => {
  try {
    const response = await axiosInstance.post("api/v1/customers/addOrUpdate", customersData);
    console.log("✅ Customers added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding customers:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Update existing shipment (same endpoint but POST with shipmentId)
export const updateCustomers = async (customerId, updatedData) => {
  try {
    const payload = { customerId, ...updatedData }; // backend expects shipmentId in body
    const response = await axiosInstance.post("api/v1/customers/addOrUpdate", payload);
    console.log("✅ Customers updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating customers:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Fetch all customers or a specific customer
export const fetchCustomers = async (customerId = null) => {
  try {
    const endpoint = customerId 
      ? `/api/v1/customers/${customerId}` 
      : "/api/v1/customers";
    const response = await axiosInstance.get(endpoint);
    console.log("✅ Customers fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching customers:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Delete customer by ID
export const deleteCustomers = async (customerId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/customers/${customerId}`);
    console.log("✅ Customer deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting customer:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Fetch all follow-ups or a specific follow-up
export const fetchFollowUps = async (followUpId = null) => {
  try {
    const endpoint = followUpId 
      ? `/api/v1/followup/${followUpId}` 
      : "/api/v1/followup";
    const response = await axiosInstance.get(endpoint);
    console.log("✅ Follow-ups fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching follow-ups:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Add or Update follow-up (single endpoint for both)
export const addFollowUp = async (followUpData) => {
  try {
    const response = await axiosInstance.post("/api/v1/followup/addOrUpdate", followUpData);
    console.log("✅ Follow-up saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving follow-up:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Delete follow-up by ID
export const deleteFollowUp = async (followUpId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/followup/${followUpId}`);
    console.log("✅ Follow-up deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting follow-up:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const updateFollowUp = async (followUpId, updatedData) => {
  try {
    const payload = { followUpId, ...updatedData }; // backend expects shipmentId in body
    const response = await axiosInstance.post("api/v1/followup/addOrUpdate", payload);
    console.log("✅ Follow-up updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating follow-up:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const addLead = async (leadData) => {
  try {
    const response = await axiosInstance.post("/api/v1/leads/addOrUpdate", leadData);
    console.log("✅ Leads saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving Leads:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const updateLeads = async (leadsId, updatedData) => {
  try {
    const payload = { leadsId, ...updatedData }; // backend expects shipmentId in body
    const response = await axiosInstance.post("api/v1/leads/addOrUpdate", payload);
    console.log("✅ Leads updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating Leads:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const addShipment = async (shipmentData) => {
  try {
    const response = await axiosInstance.post("/api/v1/shipment", shipmentData);
    console.log("✅ Shipment added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding shipment:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Update existing shipment (same endpoint but POST with shipmentId)
export const updateShipment = async (shipmentId, updatedData) => {
  try {
    const payload = { shipmentId, ...updatedData }; // backend expects shipmentId in body
    const response = await axiosInstance.post("/api/v1/shipment", payload);
    console.log("✅ Shipment updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating shipment:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const fetchShipmentsById = (shipmentId) => {return axiosInstance.get(`/api/v1/shipment/${shipmentId}`);};
  // axiosInstance.get(`/api/v1/shipment/`, { params: { id } });

// ✅ Fetch all shipments (for company ID = 2, as per your backend)
// export const fetchShipments = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/api/v1/shipment/${id}`);
//     console.log("✅ Shipments fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching shipments:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// };

// ✅ Delete shipment by ID
export const deleteShipments = async (shipmentId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/shipment/${shipmentId}`);
    console.log("✅ Shipment deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting shipment:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export default axiosInstance;
