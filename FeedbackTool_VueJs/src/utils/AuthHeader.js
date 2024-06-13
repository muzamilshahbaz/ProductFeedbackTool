export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function getAuthorizationHeader() {
  const token = getAuthToken();
  const headers = {};

  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
  
export function getAuthHeader() {
    const token = getAuthToken();
    const headers = {};
  
    if (token) {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    return headers;
}