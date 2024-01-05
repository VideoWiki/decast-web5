/* =========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// import state from '../state';
import Vue from 'vue';
import getDefaultState from './moduleStudioState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  SET_VIDEO(state, payload) {
    state.video = payload;
  },
  SET_VIDEO_ATTR(state, payload) {
    state.video[payload.key] = payload.value;
  },
  SET_TAB_INDEX(state, value) {
    state.tabIndex = value;
  },
  SET_IS_PPT(state, value) {
    state.isPPT = value;
  },
  toggleText(state) {
    state.panel.text = true;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
    state.panel.storage = false;
  },
  toggleStyle(state) {
    state.panel.text = false;
    state.panel.style = true;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
    state.panel.storage = false;
  },
  toggleLibrary(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = true;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
    state.panel.storage = false;
  },
  toggleMusic(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = true;
    state.panel.scenes = false;
    state.panel.publish = false;
    state.panel.storage = false;
  },
  toggleScenes(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = true;
    state.panel.publish = false;
    state.panel.storage = false;
  },
  togglePublish(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = true;
    state.panel.storage = false;
  },
  toggleStorage(state) {
    state.panel.storage = true;
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
  },
  setScript(state, value) {
    state.videoScript = value;
  },
  setSentences(state, value) {
    state.scenes = value;
    Object.keys(state.scenes).forEach((scene, idx) => {
      state.sceneTransition[idx] = 'no_motion';
    });
  },
  setSourceLanguage(state, value) {
    state.sourceLanguage = value;
  },
  editSceneScript(state, payload) {
    state.scenes[payload.sceneNum] = payload.value;
  },
  setKeywords(state, value) {
    state.keywords = value;
  },
  addKeyword(state, payload) {
    if (!state.keywords[payload.sceneNum]) {
      state.keywords[payload.sceneNum] = [];
    }
    state.keywords[payload.sceneNum].unshift(payload.keyword);
  },
  setAudios(state, value) {
    state.audioList = value;
  },
  setVideos(state, value) {
    state.videos = value;
    /* if (!Object.values(state.videos).every(val => val === '')) {
      state.invalidScenes = [];
      Object.entries(state.videos).forEach(([key, value]) => {
        if (value[0][3] === '') {
          state.invalidScenes.splice(parseInt(key), 1, true);
        } else {
          state.invalidScenes.splice(parseInt(key), 1, false);
        }
      });
    } */
  },
  setImages(state, value) {
    state.images = value;
  },
  resetState(state) {
    state.selectedFromLibraryMedia = [];
    state.uploadedVideos = [];
    state.preparedScenesVideos = [];
    state.addedAudioVideos = [];
    state.currentActiveScene = 1;
    state.recordedAudios = [];
    state.styles = [];
    state.previewVideo = null;
  },
  /* setSceneImage(state, payload) {
    state.sceneImage.splice(parseInt(payload.index), 1, payload.value)
  }, */
  addScene(state, indexs) {
    state.selectedFromLibraryMedia.splice(indexs, 0, null);
    state.preparedScenesVideos.splice(indexs, 0, '');
    state.addedAudioVideos.splice(indexs, 0, '');
    state.sceneTransition.splice(indexs, 0, 'no_motion');
    const sArray = Object.values(state.scenes);
    const kArray = Object.values(state.keywords);
    const vArray = Object.values(state.videos);
    const iArray = Object.values(state.images);
    sArray.splice(indexs, 0, '');
    kArray.splice(indexs, 0, []);
    vArray.splice(indexs, 0, {});
    iArray.splice(indexs, 0, {});
    state.scenes = { ...sArray };
    state.keywords = { ...kArray };
    state.videos = { ...vArray };
    state.images = { ...iArray };
    state.styles.splice(indexs, 0, {});
    state.recordedAudios.splice(indexs, 0, null);
  },
  deleteScene(state, indexs) {
    state.selectedFromLibraryMedia.splice(indexs, 1);
    state.preparedScenesVideos.splice(indexs, 1);
    state.addedAudioVideos.splice(indexs, 1);
    state.sceneTransition.splice(indexs, 1);
    const sArray = Object.values(state.scenes);
    const kArray = Object.values(state.keywords);
    const vArray = Object.values(state.videos);
    const iArray = Object.values(state.images);
    sArray.splice(indexs, 1);
    kArray.splice(indexs, 1);
    vArray.splice(indexs, 1);
    iArray.splice(indexs, 1);
    state.scenes = { ...sArray };
    state.keywords = { ...kArray };
    state.videos = { ...vArray };
    state.images = { ...iArray };
    state.styles.splice(indexs, 1);
    state.recordedAudios.splice(indexs, 1);
  },
  setInitialVideo(state, dataObj) {
    state.selectedFromLibraryMedia[dataObj.indexs] = dataObj.value;
  },
  setSearchedVideos(state, payload) {
    // Vue.set(state.videos, payload.sceneNum, payload.value)
    const sceneVideoList = Object.values(state.videos[payload.sceneNum]);
    const searchedVideoList = Object.values(payload.value);
    sceneVideoList.splice(0, 0, ...searchedVideoList);
    Vue.set(state.videos, payload.sceneNum, {
      ...sceneVideoList,
    });
  },
  setSearchedImages(state, payload) {
    // Vue.set(state.images, payload.sceneNum, payload.value)
    const sceneImageList = Object.values(state.images[payload.sceneNum]);
    const searchedImageList = Object.values(payload.value);
    sceneImageList.splice(0, 0, ...searchedImageList);
    Vue.set(state.images, payload.sceneNum, {
      ...sceneImageList,
    });
  },
  setUploadedMedia(state, payload) {
    /* if (!state.uploadedVideos[payload.sceneNum]) {
      Vue.set(state.uploadedVideos, payload.sceneNum, []);
    } 
    const uploadedVideosList = state.uploadedVideos[payload.sceneNum];
    uploadedVideosList.push(payload.value);
    Vue.set(state.uploadedVideos, payload.sceneNum, uploadedVideosList); */
    state.uploadedMedia.splice(0, 0, payload);
  },
  removeSearchedVideos(state) {
    state.searchedVideos = {};
  },

  setVideoWidth(state, value) {
    state.videoWidth = value;
  },
  setVideoHeight(state, value) {
    state.videoHeight = value;
  },

  SET_STYLE(state, payload) {
    Vue.set(state.styles, payload.sceneNum, payload.value);
  },
  setStyles(state, payload) {
    if (!state.styles[payload.sceneNum]) {
      Vue.set(state.styles, payload.sceneNum, {});
    }
    Vue.set(state.styles[payload.sceneNum], payload.prop, payload.value);
  },
  setTransition(state, payload) {
    state.sceneTransition.splice(payload.sceneNum, 1, payload.value);
  },
  setRecordedAudio(state, payload) {
    Vue.set(state.recordedAudios, payload.sceneNum, payload.value);
  },
  setUploadedAudio(state, audio) {
    state.uploadedAudios.push(audio);
  },
  setVideoWithAudio(state, payload) {
    Vue.set(state.addedAudioVideos, payload.sceneNum, payload.value);
  },
  setScriptSceneVideo(state, payload) {
    Vue.set(state.preparedScenesVideos, payload.sceneNum, payload.value);
    if (state.addedAudioVideos[payload.sceneNum]) {
      state.addedAudioVideos[payload.sceneNum] = null;
    }
    if (state.recordedAudios[payload.sceneNum]) {
      state.recordedAudios[payload.sceneNum] = null;
    }
  },
  setPrepareAllScenes(state, value) {
    state.preparedScenesVideos = value;
  },
  setPrepareAllAudios(state, value) {
    state.addedAudioVideos = value;
  },
  setActiveScene(state, value) {
    state.currentActiveScene = value;
  },
  selectMedia(state, payload) {
    state.selectedFromLibraryMedia.splice(payload.sceneNum, 1, payload.value);
    if (state.preparedScenesVideos[payload.sceneNum]) {
      state.preparedScenesVideos[payload.sceneNum] = null;
    }
    // state.selectedMedia.splice(payload.sceneNum, 1, payload.value);
  },

  setAnimationURL(state, payload) {
    const obj = {
      ...state.selectedFromLibraryMedia[payload.sceneNum],
      animationUrl: payload.value,
    };
    state.selectedFromLibraryMedia.splice(payload.sceneNum, 1, obj);
    state.preparedScenesVideos.splice(payload.sceneNum, 1, null);
    state.addedAudioVideos.splice(payload.sceneNum, 1, null);
  },
  setPreviewVideo(state, v) {
    state.previewVideo = v;
  },
  setTxData(state, dataObj) {
    state.videoTxData = dataObj;
  },
  setTags(state, tags) {
    state.tags = tags;
  },
  addTag(state, t) {
    state.tags.push(t);
  },
  removeTag(state, item) {
    state.tags.splice(state.tags.indexOf(item), 1);
  },
  setActionPerformed(state, key) {
    state.steps[key] = true;
  },
  skipSubtitles(state) {
    state.skipSubtitles = true;
  },
  skipMusic(state) {
    state.skipMusic = true;
  },
};
