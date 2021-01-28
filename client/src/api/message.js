import api from './api'

export const getAllMessage = async (userid) => {
  try {
    const res = await api.getInstance().get('/message/' + userid)
    return res.data.messages
  } catch (error) {
    return false
  }



}