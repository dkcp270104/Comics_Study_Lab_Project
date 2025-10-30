const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getApiUrl = () => API_URL;

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, token } = options;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${path}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
