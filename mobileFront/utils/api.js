// export const API_BASE_URL = "https://hoop-vision.onrender.com";
export const API_BASE_URL = "http://hoopvision.eastus2.cloudapp.azure.com:8000";

export function apiEndpoint(path) {
  return `${API_BASE_URL}${path}`;
}