import io from "socket.io-client";
import Cookie from 'js-cookie';

const SOCKET_URL = process.env.REACT_APP_API_SOCKET_URL || 'http://localhost:9000/'

export default (function () {
  var instance;
  function init() {
    console.log('init socket client')
    instance = io(SOCKET_URL, {
      auth: {
        token: Cookie.get('token')
      },
      reconnection: false
    });
    instance.on('error', data => console.log('err', data))
    instance.on('connect', data => console.log('connect', data))
    instance.on('disconnect', data => {
      console.log('disconnect', data)
      instance.removeAllListeners();
    })
    return instance;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
    clearInstance: function () {
      instance.removeAllListeners();
      instance = null;
    }
  };
})();