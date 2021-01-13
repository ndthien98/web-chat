import noti from '../components/Notificator'
import api from './api'
import EndPoint from './EndPoint'

export const updateAccount = async ({ username, displayname, gender, phone, birthday }) => {
  try {
    const res = await api.getInstance()
      .put(
        EndPoint.UPDATE_ACCOUNT + username,
        { displayname, gender, phone, birthday }
      )
    return res.data;
  } catch (error) {
    return false;
  }
}