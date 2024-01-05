/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import store from '../store';
import axios from '../../axios';
import constants from '../../../constant';

export default {
  // /////////////////////////////////////////////
  // VideoWiki
  // /////////////////////////////////////////////

  fetchVideoChunks({ commit }, meetingId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          constants.apiUrl + '/api/create_chunks/' + `?meeting_id=${meetingId}`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  breakVideoIntoScenes({ commit }, reuqestBody) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/create_chunks/', reuqestBody)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  extractInfoFromUrl({ commit }, requestBody) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/extract_info_url/', requestBody)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  uploadDoc({ commit }, documentFile) {
    var form = new FormData();
    form.append('file', documentFile);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/extract_info_file/', form)
        .then((res) => {
          // commit('selectVideo', res.data.video_url);
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  trimVideo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/trim_video/', payload)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  generateKey({ commit }, payload) {
    const data = new FormData();
    data.append('username', payload);
    console.log(data);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/generate/key/', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getKey({ commit }, payload) {
    const data = new FormData();
    data.append('username', payload);
    console.log(data);
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiUrl + '/api/get/key/?username=' + payload, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  fastVideo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/speed_up_video/', payload)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  summarizeScript({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        text: store.state.studio.video.script,
        srcLang: store.state.studio.video.language,
      };
      axios
        .post(constants.apiUrl + '/smz/new', dataObj)
        .then((res) => {
          /* let script = '';
          for (const s in res.data) {
            script = script + res.data[s] + ' ';
          }
          commit('setScript', script); */
          commit('SET_VIDEO_ATTR', {
            key: 'description',
            value: res.data.summary,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  generateTags({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        title: store.state.studio.video.title,
        keywords: [],
      };
      Object.values(store.state.studio.keywords).forEach((arr) => {
        dataObj.keywords.push(...arr);
      });
      axios
        .post(constants.apiUrl + '/api/tags/', dataObj)
        .then((res) => {
          /* let script = '';
          for (const s in res.data) {
            script = script + res.data[s] + ' ';
          } 
          commit('setScript', script); */
          commit('setTags', res.data.tags);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sentenceDetection({ commit }, value) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        text: store.state.studio.video.script,
        /* srcLang: store.state.studio.video.language, */
        break_type: value,
      };
      axios
        .post(constants.apiUrl + '/api/sentence_detection/', dataObj)
        .then((res) => {
          commit('setSentences', res.data.sentences);
          commit('setKeywords', res.data.keywords);
          commit('setSourceLanguage', res.data.srcLang);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  audioSuggestions({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        keywords: store.state.studio.keywords,
        srcLang: store.state.studio.video.language,
      };
      axios
        .post(constants.apiUrl + '/al/', dataObj)
        .then((res) => {
          // console.log('audio suggestions', res);
          commit('setAudios', res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log('error in audio suggestion', err);
          reject(err);
        });
    });
  },
  audioVideoMerge({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/audio_video_merge/', dataObj)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  videoSuggestions({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        keywords: store.state.studio.keywords,
        srcLang: store.state.studio.video.language,
      };
      axios
        .post(constants.apiUrl + '/api/media_list/', dataObj)
        .then((res) => {
          commit('setVideos', res.data.videos);
          commit('setImages', res.data.images);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  searchMedia({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/media_search/', dataObj)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addMotionToImage({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/add_motion/', dataObj)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editSceneScript({ commit }, sceneScriptData) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/add_subtitle/', sceneScriptData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  concatenateVideos({ commit }, videoWikiData) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/video_concat/', videoWikiData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  uploadMedia({ commit }, mediaFile) {
    var form = new FormData();
    form.append('media', mediaFile);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/upload_media/', form)
        .then((res) => {
          resolve(res.data.media_url);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publishVideo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/publish_video/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  saveVideo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/save_video/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getVideoData({ commit }, videoId) {
    commit('setInitialState');
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiUrl + '/api/video_details?saved_video_id=' + videoId)
        .then((res) => {
          const apiResponse = res.data.data;
          console.log({ apiResponse });
          const videoData = {};
          const videoDataKeys = [
            'title',
            'script',
            'description',
            'language',
            'bg_music',
            'published_id',
            'url',
          ];
          videoDataKeys.forEach((key) => {
            videoData[key] = apiResponse[key];
          });
          videoData.is_paid = false;
          videoData.saved_id =
            apiResponse.video_type === 'saved'
              ? apiResponse.saved_video_id
              : null;
          commit('SET_VIDEO', videoData);
          commit('setTags', apiResponse.tags);
          const sentences = {};
          const keywords = {};
          Object.entries(apiResponse.scenes).forEach(([key, value]) => {
            sentences[key] = value.subtitle.text;
            keywords[key] = value.keywords;
            commit('setTransition', {
              sceneNum: parseInt(key),
              value: value.transition,
            });
            commit('setRecordedAudio', {
              sceneNum: parseInt(key),
              value: value.audio.url,
            });
            commit('selectMedia', {
              sceneNum: parseInt(key),
              value: {
                id: value.media.lib_media_id,
                url: value.media.url,
              },
            });
            commit('SET_STYLE', {
              sceneNum: parseInt(key),
              value: value.subtitle.style,
            });
          });
          commit('setSentences', sentences);
          commit('setKeywords', keywords);
          commit('skipSubtitles');
          commit('skipMusic');
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetState({ commit }) {
    commit('setInitialState');
  },
  postTxData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/transaction/oceanbuy', payload)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTemplate({ commit }, payload) {
    console.log('getTemplate');
    return new Promise((resolve, reject) => {
      axios
        .get(
          constants.apiCastUrl +
            `/api/event/get/template/?cast_id=${payload.cast_id}&role=${payload.role}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  setTemplate({ commit }, payload) {
    console.log(payload);
    var config = {
      method: 'patch',
      url: constants.apiCastUrl + '/api/event/update/template/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    console.log('setTemplate');
    return new Promise((resolve, reject) => {
      axios(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  magicJoin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var config = {
        method: 'post',
        url: constants.apiCastUrl + '/api/event/join/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload,
      };

      axios(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addJoinee({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/public/joinee/add/', payload, {
          headers: {
            Authorization: '',
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  joinEvent({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/join/', payload, {
          headers: {
            Authorization: '',
          },
        })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // user details after cast is added
  inviteeDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/invitee/details/', {
          params: { cast_id: payload.cast_id },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  checkInvitee({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/check/email/', {
          params: { email: payload.email, cast_id: payload.cast_id },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  inviteesCSV({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/users/details/download/', {
          params: { cast_id: payload.cast_id },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addInvitee({ commit }, payload) {
    console.log(payload, 'pay');
    return new Promise((resolve, reject) => {
      axios
        .post(
          constants.apiCastUrl + '/api/event/meeting/add/invitees/',
          payload
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteInvitee({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(constants.apiCastUrl + '/api/event/invitee/delete/', {
          data: payload,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  updateEnableNft({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          constants.apiCastUrl + '/api/event/invitee/details/update/',
          payload
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  audienceAirdropMail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/send/nft/drop/mail/', {
          params: { cast_id: payload.cast_id },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  audienceCertificateMail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          constants.apiCastUrl +
            '/api/event/send/nft/certi/drop/mail/?cast_id=' +
            payload.cast_id
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  updateMintDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/event/update/mint/data/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publicNftActivate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/nft/activate/public/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addMintDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/add/wallet/address/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyMintDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/verify/public/address/', {
          params: {
            cast_id: payload.cast_id,
            public_address: payload.public_address,
            nft_type: payload.nft_type,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMintId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/send/hashed/id/', {
          params: {
            cast_id: payload.cast_id,
            public_address: payload.public_address,
            nft_type: payload.nft_type,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publicAddWallet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/add/public/wallet/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publicVerifyWallet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/verify/public/wallet/', {
          params: {
            public_address: payload.public_address,
            cast_id: payload.cast_id,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publicUpdateMint({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          constants.apiCastUrl + '/api/event/mint/update/public/wallet/',
          payload
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  publicGetMintId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/send/hashed/id/public', {
          params: {
            cast_id: payload.cast_id,
            public_address: payload.public_address,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  startStream({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/ls/start/', {
          params: {
            cast_id: payload.cast_id,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  endStream({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/ls/end/', {
          params: {
            cast_id: payload.cast_id,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  isEventRunning({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiCastUrl + '/api/event/meeting/running/', {
          params: {
            public_meeting_id: payload.cast_id,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateNftDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/event/update/nft/details/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addNftDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/add/nft/details/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendTestEmail({ commit }, payload) {
    console.log('send test email');
    var data = new FormData();
    data.append('cast_id', payload.cast_id);
    data.append('role', payload.role);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/send/test/mail/', data)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  resetTemplate({ commit }, payload) {
    console.log('reset Template');
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/event/reset/template/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  createInstantCast({ commit }, { castName, name, timeZone, time }) {
    console.log('Creating instant cast', castName, name, time, timeZone);
    var data = new FormData();
    data.append('event_name', castName);
    data.append('creator_name', name);
    data.append('schedule_time', time);
    data.append('timezone', timeZone);

    var config = {
      method: 'post',
      url: constants.apiCastUrl + '/api/create/cast/',
      headers: {
        Authorization: 'Api-Key ' + constants.oneClickPass,
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  setMerkleTool({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('https://api.cast.video.wiki/api/save/merkel/tree/details/', {
          cast_id: payload.cast_id,
          data: payload.data,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getMerkleTree({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          constants.apiCastUrl +
            '/api/get/merkel/tree/details/?cast_id=' +
            payload
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
