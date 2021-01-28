import api from './api'

export const updateAccount = async ({ username, displayname, gender, phone, birthday }) => {
  try {
    const res = await api.getInstance()
      .put(
        '/account/' + username,
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
      .get('/account/find?keyword=' + username)
    return res.data.account;
  } catch (error) {
    return false;
  }
}

export const updateAvatar = async (avatar) => {
  try {
    const res = await api.getInstance()
      .put('/account/avatar', { avatar })
    return res.data;
  } catch (error) {
    return false;
  }
}

export const getAllAccounts = async () => {
  try {
    const res = await api.getInstance()
      .get('/account/all')
    return res.data.accounts;
  } catch (error) {
    return false;
  }
}

export const getAccountByUsername = async (username) => {
  try {
    const res = await api.getInstance()
      .get('/account/' + username)
    return res.data.account;
  } catch (error) {
    return false;
  }
}