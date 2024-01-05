/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import jwt from '../../http/requests/auth/jwt/index.js';
import constants from '../../../constant';
import router from '@/router';
import axios from '@/axios.js';

export default {
  sendingOtp({ commit }, payload) {
    const { email, meeting_id } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/send/otp/?email=${email}&cast_id=${meeting_id}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  verifyingOtp({ commit }, payload) {
    const { email, otp, meeting_id } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/validate/otp/?email=${email}&cast_id=${meeting_id}&otp=${otp}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  async otpSent({ commit }, payload) {
    const email = payload.email;
    const userDetails = {
      email,
    };
    try {
      console.log('hello');
      const resObj = await axios.post(
        constants.apiUrl + `/api/send_otp/`,
        userDetails
      );
      console.log('resObj is', resObj.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(
          payload.userDetails.password,
          payload.userDetails.email,
          payload.params.login_challenge
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  userRegister({ commit }, payload) {
    const { firstName, lastName, email, password } = payload.userDetails;

    return new Promise((resolve, reject) => {
      jwt
        .registerUser(firstName, lastName, email, password)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  googleRegister({ commit }, payload) {
    const { firstName, lastName, email, googleIdToken } = payload.userDetails;

    return new Promise((resolve, reject) => {
      jwt
        .registerUser(firstName, lastName, email, googleIdToken)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  registerUser({ commit }, payload) {
    const { firstName, lastName, email, password, confirmPassword } =
      payload.userDetails;

    return new Promise((resolve, reject) => {
      // Check confirm password
      if (password !== confirmPassword) {
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(firstName, lastName, email, password)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');

    window.location.reload();
    // find a way to logout without refresh
    commit('LOGOUT', null, { root: true });
  },
  updateUserDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .updateUser(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .changePassword(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise((resolve) => {
      jwt.refreshToken().then((response) => {
        console.log('response', response);
        resolve(response);
      });
    });
  },
  fetchUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_USER_INFO', payload, { root: true });
      commit('SET_BEARER', payload.access_token);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'register',
        authenticationMethod: 'Email',
        userId: payload.id,
      });
      resolve(true);
    });
  },
  fetched({ commit }) {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const access = localStorage.getItem('accessToken');
      commit('UPDATE_USER_INFO', user, { root: true });
      commit('SET_BEARER', access);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'register',
        authenticationMethod: 'Email',
        userId: user.id,
      });
      resolve(true);
    });
  },
  sendOtp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .sendOtp(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  verifyOtp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .verifyOtp(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // for Metamask
  getNonce({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .generateNonce(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendSignature({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .verifySignature(payload)
        .then((response) => {
          console.log('response');
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //metamask wallet address
  saveWalletAddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .saveAddress(payload)
        .then((res) => {
          commit('GET_WALLET_ADDRESS', res.data.status);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  removeWalletAddress({ commit }, val) {
    commit('GET_WALLET_ADDRESS', val);
    return val;
  },

  addURLS({ commit }, data) {
    commit('ADD_URLS', data);
    return true;
  },
  setOpen({ commit }, data) {
    commit('SET_OPEN', true);
    return true;
  },
  eventDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .eventDetail(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  submitSheet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .submitSheet(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendResetEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .sendResetEmail(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .resetPassword(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // this is for registration
  sendAccessTokenReg({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .generateAccessToken(payload)
        .then((response) => {
          // If there's user data in response
          if (response.data.usersData) {
            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);

            // Extracting first and last name from the username
            const userData = response.data.usersData;
            const nameParts = userData.username.split(' ');
            if (nameParts.length > 1) {
              userData.first_name = nameParts.slice(0, -1).join(' ');
              userData.last_name = nameParts[nameParts.length - 1];
            } else {
              userData.first_name = userData.username;
              userData.last_name = '';
            }

            // Updating userdetails with first and last name
            commit('UPDATE_USER_INFO', userData, { root: true });

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  sendAccessToken({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .generateAccessToken(payload)
        .then((response) => {
          resolve(response);
          // If there's user data in response
          if (response.data.usersData) {
            const userData = response.data.usersData;
            commit('UPDATE_USER_INFO', userData, { root: true });

            commit('SET_BEARER', response.data.accessToken);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  contactUs({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .contactUs(payload)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
