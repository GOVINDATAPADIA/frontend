import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (formData) => api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Clients API
export const clientsAPI = {
  getAll: () => api.get('/clients'),
  getById: (id) => api.get(`/clients/${id}`),
  create: (formData) => api.post('/clients', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/clients/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/clients/${id}`),
};

// Contact API
export const contactAPI = {
  getAll: () => api.get('/contact'),
  create: (data) => api.post('/contact', data),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Newsletter API
export const newsletterAPI = {
  getAll: () => api.get('/newsletter'),
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  delete: (id) => api.delete(`/newsletter/${id}`),
};

export default api;
