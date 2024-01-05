import axios from '../../../axios/index.js';
import store from '../../../../store/store.js';
import Constant from '../../../../../constant';

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default {
  init() {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            store.dispatch('auth/fetchAccessToken').then((access_token) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(access_token);
            });
          }

          const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber((access_token) => {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  },
  login(password, email, challenge) {
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: 'post',
      // url: `https://cors-anywhere.herokuapp.com/https://openid.vwtv.pt/api/login/?login_type=web1&login_challenge=${challenge}`, //uncomment when use in local
      url: `${Constant.hydra_ep}/api/login/?login_type=web1&login_challenge=${challenge}`, // comment when use in local
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return axios(config);
  },
  registerUser(firstName, lastName, email, pwd) {
    // const url='https://cors-anywhere.herokuapp.com/' + Constant.hydra_ep + '/api/user/register/'
    const url = Constant.hydra_ep + '/api/user/register/';
    return axios.post(url, {
      first_name: firstName,
      last_name: lastName,
      username: firstName + lastName,
      email,
      password: pwd,
      profile: {
        zip: 'your_zip_code',
        city: 'your_city_name',
        active: true,
      },
    });
  },
  updateUser(payload) {
    var form = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      form.append(key, value);
    }
    return axios.patch(Constant.profilingUrl + `/api/profile/update/`, form);
  },
  changePassword(payload) {
    return axios.post(`${Constant.hydra_ep}/api/change_password/`, payload);
  },
  refreshToken() {
    return axios.post(Constant.apiUrl + '/api/auth/refresh-token/', {
      accessToken: localStorage.getItem('accessToken'),
    });
  },
  generateNonce(payload) {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('public_add', payload.public_add);

    var config = {
      method: 'post',
      // url: `https://cors-anywhere.herokuapp.com/${Constant.hydra_ep}/api/user/metamask/register/`, //uncomment when use in local
      url: `${Constant.hydra_ep}/api/user/metamask/register/`, // comment when use in local
      data: data,
    };

    return axios(config);
  },
  verifySignature(payload) {
    console.log(payload);
    var config = {
      method: 'post',
      // url: `https://cors-anywhere.herokuapp.com/${Constant.hydra_ep}/api/login/?login_challenge=${payload.login_challenge}&login_type=web3`, //uncomment when use in local
      url: `${Constant.hydra_ep}/api/login/?login_challenge=${payload.login_challenge}&login_type=web3`, // comment when use in local
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    return axios(config);
  },
  sendOtp(payload) {
    return axios.get(Constant.apiCastUrl + '/api/event/send/otp/', {
      params: { email: payload.email, cast_id: payload.cast_id },
    });
  },
  verifyOtp(payload) {
    return axios.get(Constant.apiCastUrl + '/api/event/validate/otp/', {
      params: {
        email: payload.email,
        otp: payload.otp,
        cast_id: payload.cast_id,
      },
    });
  },
  saveAddress(payload) {
    return axios.post(
      Constant.apiCastUrl + `/api/event/add/wallet/address/`,
      payload
    );
  },
  eventDetail(payload) {
    return axios.get(Constant.apiCastUrl + '/api/event/meeting/info/', {
      params: {
        public_meeting_id: payload,
      },
    });
  },
  async submitSheet(payload) {
    console.log(payload);
    return axios.post(
      Constant.apiCastUrl + '/api/event/invitee/import/',
      payload
    );
  },
  generateAccessToken(payload) {
    console.log('payload', payload);
    var data = JSON.stringify({
      access_token: payload.access_token,
    });
    return axios({
      method: 'POST',
      // url: `https://cors-anywhere.herokuapp.com/${Constant.hydra_ep}/api/login/?login_type=web2&login_challenge=${payload.login_challenge}`, //uncomment when use in local
      url: `${Constant.hydra_ep}/api/login/?login_type=web2&login_challenge=${payload.login_challenge}`, // comment when use in local
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  sendResetEmail(payload) {
    return axios.get(
      Constant.hydra_ep +
        `/api/password/reset/mail/?email=${payload}&origin=cast`
    );
  },
  resetPassword(payload) {
    return axios.post(Constant.hydra_ep + '/api/password/reset/', payload);
  },
  autoLogin({ username, lc, token }) {
    return axios.get(
      Constant.hydra_ep +
        `/api/auto/login/?username=${username}&login_challenge=${lc}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  contactUs(payload) {
    return axios.post(Constant.apiUrl + '/community/contact_us/', payload);
  },
};
