/* =========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import axios from '../../http/axios/index.js';

export default {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    state.accessToken = accessToken;
  },
  GET_WALLET_ADDRESS(state, value) {
    state.isGetWalletAddress = value;
  },
  ADD_URLS(state, value) {
    state.coHostUrl = value['co-host_url'][0];
    state.participantUrl = value.participant_url[0];
    state.castID = value.public_cast_id;
  },
  SET_OPEN(state, value) {
    state.open = true;
  },
  SET_LOGGEDIN(state, value) {
    state.loggedIn = value;
  },
};
