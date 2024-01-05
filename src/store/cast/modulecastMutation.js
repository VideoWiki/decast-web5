import getDefaultState from './moduleCastState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  setCastList(state, payload) {
    state.casts = payload;
  },
  setCastDetails(state, { castId, details }) {
    state.castsInfo[castId] = details;
  },
  addCast(state, payload) {
    state.casts.push(payload);
  },
  SET_RECORDINGLIST(state,payload){
    state.recordingList = payload; 
  },
  SET_CASTS_INFO(state, castsInfo) {
    state.castsInfo = castsInfo;
  },
  SET_ALLCASTS(state, casts) {
    state.casts = casts;
  },
};
