import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Create a assistant
export const createAssistant = (assistantData) => axios.post(`${API_URL}assistants/`, assistantData);

// Get all assistants
export const getAssistants = () => axios.get(`${API_URL}assistants/list/`);

// Update a assistant
export const updateAssistant = (id, assistantData) => axios.put(`${API_URL}assistants/${id}/`, assistantData);

// Delete a assistant
export const deleteAssistant = (id) => axios.delete(`${API_URL}assistants/${id}/`);
