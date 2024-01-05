/* eslint-disable camelcase */
import axios from '../../axios';
import constant from '../../../constant';
export default {
  async getList({ commit }, payload) {
    const res = await axios.get('https://api.room.video.wiki/api/list/');
    console.log(res,'roomlkis');
    const { room_data } = res.data;
    if (room_data.length > 1) {
      commit('setRooms', room_data.slice(1, room_data.length));
    }
    commit('SET_ROOM', room_data[0]);
  },
  async start({ commit }, payload) {
    const res = await axios({
      method: 'POST',
      url: 'https://api.room.video.wiki/api/join/',
      data: {
        name: 'Ritik',
        public_meeting_id: payload,
        password: '',
      },
    });
    return res;
  },

  async addRoom({ commit }, payload) {
    const res = await axios({
      method: 'POST',
      url: 'https://api.room.video.wiki/api/create/',
      data: {
        event_name: payload,
        room_code: '',
        join_now: 'False',
        logout_url: 'https://decast.live/dashboard',
      },
    });
    var room = {
      room_name: payload,
      room_url:
        'https://api.room.video.wiki/join-room/' + res.data.public_cast_id,
    };
    commit('ADD_ROOM', room);
    return res;
  },
  async getRecordings({ commit }) {
    const res = await axios.get(
      'https://api.room.video.wiki/api/get/user/recordings/'
    );
    commit('SET_RECORDINGS', res.data.recordings);
    return res.data;
  },
};
