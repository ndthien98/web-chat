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

export const findUserByUsername = async (username) => {
  try {
    const res = await api.getInstance()
      .get(EndPoint.FIND_ACCOUNT + '?keyword=' + username)
    return res.data.account;
  } catch (error) {
    return false;
  }
}

export const updateAvatar = async (avatar) => {
  try {
    const res = await api.getInstance()
      .put(EndPoint.UPDATE_AVATAR, { avatar })
    return res.data;
  } catch (error) {
    return false;
  }
}
