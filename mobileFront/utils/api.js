export const API_BASE_URL = "https://hoop-vision.onrender.com";

export function apiEndpoint(path) {
  return `${API_BASE_URL}${path}`;
}