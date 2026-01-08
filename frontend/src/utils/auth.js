// simple token helpers: get/set/clear and basic JWT expiry check
export function getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

export function getUser() {
  const u = localStorage.getItem('user') || sessionStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

export function setAuth(token, user = null, remember = false) {
  if (remember) {
    localStorage.setItem('token', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  } else {
    sessionStorage.setItem('token', token);
    if (user) sessionStorage.setItem('user', JSON.stringify(user));
  }
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

export function tokenIsValid(token) {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(json);
    if (payload.exp) {
      // exp is in seconds
      return payload.exp * 1000 > Date.now();
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default { getToken, getUser, setAuth, clearAuth, tokenIsValid };
