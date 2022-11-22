import runAPI from './runAPI';


// Gets a new token from the server
export const refreshTokenAPI = async (token) => {
  return await runAPI('/auth/refresh-token', token);
}

// Admin login
export const adminLoginAPI = async (password) => {
  return await runAPI('/auth/admin-login', '', { password });
}

// Logins a user
export const loginAPI = async (loginData) => {
  return await runAPI('/auth/login', '', loginData);
}

// Registers a user
export const signUpAPI = async (signupData) => {
  return await runAPI('/auth/register', '', signupData);
}

// Changes a user's password
export const changePasswordAPI = async (token, passwordData) => {
  return await runAPI('/auth/change-password', token, passwordData);
}