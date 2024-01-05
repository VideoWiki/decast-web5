/* =========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
const getDefaultState = () => {
  return {
    video: {
      title: '',
      description: '',
      script: '',
      language: 'en',
      url: '',
      bg_music: {
        id: null,
        title: null,
        url: null
      },
      is_paid: false,
      saved_id: null,
      published_id: null
    },
    videoTxData: null,
    isPPT: false,
    tabIndex: 0,
    sourceLanguage: 'en',
    panel: {
      text: true,
      style: false,
      library: false,
      music: false,
      scenes: false,
      publish: false,
      storage: false,
    },
    scenes: {}, // 1
    activeSceneInLibrary: 1,
    activeSceneInScenes: 1,
    keywords: {}, // 2
    videos: {}, // 3
    images: {},
    audioList: {},
    invalidScenes: [],
    searchedVideos: {},
    searchedImages: {}, // 4

    currentActiveScene: 1,

    // selectedMedia: [],

    selectedFromLibraryMedia: [], // 5
    // sceneImage: [],
    uploadedMedia: [], // 6
    videoWidth: null,
    videoHeight: null,
    preparedScenesVideos: [],
    styles: [], // 7
    recordedAudios: [], // 8
    uploadedAudios: [],
    addedAudioVideos: [],
    styleVideos: [],
    sceneTransition: [],
    previewVideo: null,
    tags: [],
    skipSubtitles: false,
    skipMusic: false
  };
};
export default getDefaultState;
