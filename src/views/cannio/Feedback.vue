<template>
  <div style="padding: 3% 6% !important" data-canny />
</template>

<script>
import jwt from 'jsonwebtoken';

const BoardToken = '57a62f5a-065e-4eb0-b7fa-017dc97ae719';
const PrivateKey = '4a7e1f61-5069-2936-abe2-f7ac5b5b5bd1';

export default {
  data() {
    return {
      ssoToken: null,
    };
  },
  mounted() {
    (function (w, d, i, s) {
      function l() {
        if (!d.getElementById(i)) {
          var f = d.getElementsByTagName(s)[0];
          var e = d.createElement(s);
          (e.type = 'text/javascript'),
            (e.async = !0),
            (e.src = 'https://canny.io/sdk.js'),
            f.parentNode.insertBefore(e, f);
        }
      }
      if (typeof w.Canny !== 'function') {
        var c = function () {
          c.q.push(arguments);
        };
        (c.q = []),
          (w.Canny = c),
          d.readyState === 'complete'
            ? l()
            : w.attachEvent
            ? w.attachEvent('onload', l)
            : w.addEventListener('load', l, !1);
      }
    })(window, document, 'canny-jssdk', 'script');

    Canny('render', {
      boardToken: BoardToken,
      basePath: '/feedback', // See step 2
      ssoToken: this.ssoToken, // See step 3
    });
  },
  computed: {},
  methods: {
    createCannyToken(user) {
      var userData = {
        avatarURL: user.photoUrl, // optional, but preferred
        email: user.email,
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
      };
      this.ssoToken = jwt.sign(userData, PrivateKey, { algorithm: 'HS256' });
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.createCannyToken(user);
  },
};
</script>
