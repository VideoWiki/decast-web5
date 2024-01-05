import actions from './moduleRoomActions.js';
import mutations from './moduleRoomMutations.js';
import getDefaultState from './moduleRoomState.js';

export default {
  namespaced: true,
  actions,
  state: getDefaultState(),
  mutations,
};
