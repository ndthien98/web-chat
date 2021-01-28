import api from './api'

export const login = async ({ username, password }) => {
  try {
    const res = await api.getInstance()
      .post('/auth/login/', {
        username, password
      })
    return res.data;
  } catch (error) {
    return false;
  }
}

export const register = async ({ username, password, displayname, gender, phone, birthday }) => {
  try {
    const res = await api.getInstance()
      .post(
        '/auth/register/',
        { username, password, displayname, gender, phone, birthday }
      )
    return res.data;
  } catch (error) {
    return false;
  }
}

export const getCurrent = async () => {
  try {
    const res = await api.getInstance()
      .get('/auth/current/')
    return res.data;
  } catch (error) {
    return false;
  }
}

export const changePassword = async ({ password, newpassword, repassword }) => {
  try {
    const res = await api.getInstance()
      .post(
        '/auth/change-password/',
        { password, newpassword, repassword }
      )
    return res.data;
  } catch (error) {
    return false;
  }
}
