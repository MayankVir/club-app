// api.js
import axios from "axios";

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: "https://admin.enigmamotions.com/api",
  headers: {
    "Content-Type": "multipart/form-data", // For POST requests
  },
});

// Function to save match details
export const saveMatchDetails = async (matchDetails) => {
  const formData = new FormData();
  for (const key in matchDetails) {
    formData.append(key, matchDetails[key]);
  }

  console.log({ matchDetails });

  try {
    const response = await apiClient.post("/save-match-details", formData);
    return response.data;
  } catch (error) {
    console.error("Error saving match details:", error);
    throw error;
  }
};

// Function to save a notification
export const saveNotification = async (message) => {
  const formData = new FormData();
  formData.append("messages", message);

  try {
    const response = await apiClient.post("/save-notification", formData);
    return response.data;
  } catch (error) {
    console.error("Error saving notification:", error);
    throw error;
  }
};

// Function to get match history
export const getMatchHistory = async (filters) => {
  try {
    const response = await apiClient.get("/match-history", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching match history:", error);
    throw error;
  }
};

// Function to get notifications
export const getNotifications = async () => {
  try {
    const response = await apiClient.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Function to get club list
export const getClubList = async () => {
  try {
    const response = await apiClient.get("/auth/get-club-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching club list:", error);
    throw error;
  }
};
