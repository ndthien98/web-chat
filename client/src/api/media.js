import api from './api'

export const uploadFile = async (formdata) => {
  try {
    const res = await api.getInstance()
      .put(
        '/media/upload',
        formdata, {}
      )
    return res.data;
  } catch (error) {
    return false;
  }
}
