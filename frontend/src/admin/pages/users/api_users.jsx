import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Create a user
export const createUser = (userData) => axios.post(`${API_URL}users/`, userData);

// Get all users
export const getUsers = () => axios.get(`${API_URL}users/list`);

// Update a user
export const updateUser = (id, userData) => axios.put(`${API_URL}users/${id}/`, userData);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API_URL}users/${id}/`);
