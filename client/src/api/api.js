
const Axios = require('axios')
const Qs = require('qs')
const Cookie = require('js-cookie')
var axios = (function () {
  var instance;
  let isRefreshing = false;
  let refreshSubscribers = [];
  const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
  };
  const onRrefreshed = (token) => {
    refreshSubscribers.map((callback) => callback(token));
    refreshSubscribers = [];
  };
  function init() {
    const instance = Axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
    instance.interceptors.request.use(
      (request) => {
        request.headers.authorization = `Bearer ${Cookie.get('token')}`;
        console.log(request)
        return request;
      },
      (error) => {
        console.log(error.response)
        console.log(error.request)
        return Promise.reject(error);
      },
    );
    instance.interceptors.response.use(
      (response) => {
        console.log(response)
        return response;
      },
      (error) => {
        console.log(error.response)
        console.log(error.request)
        const refreshToken = Cookie.get('refreshToken');
        const {
          config,
          response: { status },
        } = error;
        const originalRequest = config;
        if (status === 401) {
          if (!isRefreshing) {
            isRefreshing = true;
            axios
              .post(
                process.env.REACT_APP_API_BASE_URL + '/auth/refresh-token',
                { refreshToken },
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    authorization: `Bearer ${Cookie.get('token')}`,
                  },
                },
              )
              .then(({ data }) => {
                Cookie.set('token', data.token, {
                  expires: 365,
                });
                Cookie.set('refreshToken', data.refreshToken, {
                  expires: 365,
                });
                isRefreshing = false;
                onRrefreshed(data.token);
              })
              .catch((err) => {
                Cookie.remove('token')
                Cookie.remove('refreshToken')
                isRefreshing = false;
                window.location = '/';
              });
          }

          const retryOrigReq = new Promise((resolve, reject) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers.authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOrigReq;
        }
        return Promise.reject(error);
      },
    );
    return instance;
  };
  return {
    getInstance: () => instance || init()
  };
})();

export default axios;
