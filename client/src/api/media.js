import api from './api'
import EndPoint from './EndPoint'

export const uploadFile = async (formdata) => {
  try {
    const res = await api.getInstance()
      .put(
        EndPoint.UPLOAD_FILE,
        formdata, {}
      )
    return res.data;
  } catch (error) {
    return false;
  }
}
