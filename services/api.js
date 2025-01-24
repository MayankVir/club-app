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

export const updateScore = async (scoreDetails) => {
  const formData = new FormData();
  formData.append("match_id", scoreDetails.match_id);
  formData.append("player1Score", scoreDetails.player1Score);
  formData.append("player2Score", scoreDetails.player2Score);

  try {
    const response = await apiClient.post("/update-score", formData);
    return response.data;
  } catch (error) {
    console.error("Error updating score:", error);
    throw error;
  }
};
