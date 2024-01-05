import getDefaultState from './moduleRoomState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  setRooms(state, payload) {
    state.rooms = payload;
  },
  SET_ROOM(state, payload) {
    state.room = payload;
  },
  ADD_ROOM(state, payload) {
    state.rooms.push(payload);
  },
  SET_RECORDINGS(state, payload) {
    state.recordings = payload;
  },
  SET_POPUP(state, payload) {
    state.activePopup = payload;
  },
};
