import HTTP from '../axios';

export const ajaxCallMixin = {
  response: {},
  methods: {
    ajaxCall: async function (url, data, callBack = null, extraFields = []) {
      var form = new FormData();
      // var params = JSON.stringify(data);
      // form.append('body', params);
      for (const [key, value] of Object.entries(data)) {
        form.append(key, value);
      }
      try {
        this.response = await HTTP.post(url, form);
      } catch (e) {
        this.response = e.response;
      }
      if (callBack != null) {
        return callBack(this.response.data);
      }
    },
    getRequest: async function (url, callBack = null) {
      this.response = await HTTP.get(url);
      if (callBack != null) {
        return callBack(this.response.data);
      }
    }
  }
};
