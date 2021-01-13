import api from './api'
import EndPoint from './EndPoint'

export const login = async ({ username, password }) => {
  try {
    const res = await api.getInstance()
      .post(EndPoint.LOGIN, {
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
        EndPoint.REGISTER,
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
      .get(EndPoint.GET_CURRENT_USER)
    return res.data;
  } catch (error) {
    return false;
  }
}

export const changePassword = async ({ password, newpassword, repassword }) => {
  try {
    const res = await api.getInstance()
      .post(
        EndPoint.CHANGE_PASSWORD,
        { password, newpassword, repassword }
      )
    return res.data;
  } catch (error) {
    return false;
  }
}
