import Vue from 'vue';
import Router from 'vue-router';
import FullPage from '@/layouts/full-page/FullPage.vue';
// import Landing from '@/views/Landing.vue';
import Landing from '@/views/NewLanding__2.vue';
import Creators from '@/views/Creators.vue';
import Promoters from '@/views/Promoters.vue';
import Operators from '@/views/Operators.vue';
import Infrastructure from '@/views/Infrastructure.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: FullPage,
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/welcome',
          name: 'Welcome',
          component: () => import('./views/Index.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/about',
          name: 'What is Decast?',
          component: () => import('./views/About.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/test',
          name: 'Testing',
          component: () => import('./views/Playground.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/moved',
          name: 'Moved',
          component: () => import('./views/Moved.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/EditNFT/:cast_Id',
          name: 'Edit NFT',
          component: () => import('./views/create-event/EditNFT.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/EditCertificate/:cast_Id',
          name: 'Edit Certificate',
          component: () => import('./views/create-event/EditCertificate.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/',
          name: 'Welcome to Decast',
          component: Landing,
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/creators',
          name: 'Welcome to Decast | Creators',
          component: Creators,
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/promoters',
          name: 'Welcome to Decast | Promoters',
          component: Promoters,
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/operators',
          name: 'Welcome to Decast | Operators',
          component: Operators,
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/infrastructure',
          name: 'Welcome to Decast | Infrastructure',
          component: Infrastructure,
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/achievements',
          name: 'Awards',
          component: () => import('./views/NewAwards.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/privacy',
          name: 'Privacy Policy',
          component: () => import('./views/PrivacyNew.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/terms',
          name: 'Terms and Conditions',
          component: () => import('./views/TermsConditions.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/room',
          name: 'Room',
          component: () => import('./views/classroom/Classroom.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        // {
        //   path: '/e/:session_key?',
        //   name: 'meetingid',
        //   component: () => import('./views/components/join/e.vue'),
        //   meta: {
        //     rule: 'isPublic',
        //   },
        // },
        {
          path: '/team',
          name: 'Teams',
          component: () => import('./views/Teams.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/goals',
          name: 'Goals',
          component: () => import('./views/Goals.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/vc',
          name: 'Video Conference',
          component: () => import('./views/VideoConference.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/awards',
          name: 'Awards',
          component: () => import('./views/Awards.vue'),
          meta: {
            rule: 'isPublic',
          },
        },

        {
          path: '/search',
          name: 'Search',
          component: () => import('./views/search/Index.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/video/:slug',
          name: 'Video View',
          component: () => import('./views/videos/NewDetailViewVideo.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/privacy-policy',
          name: 'Privacy Policy',
          component: () => import('./views/Privacy.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/terms-of-use',
          name: 'Terms of Use',
          component: () => import('./views/Terms.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/integration/ms-teams',
          name: 'MsTeams',
          component: () => import('./views/Integrations/MsTeams/MsTeams.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/integration/ocean-protocol',
          name: 'OceanProtocol',
          component: () =>
            import('./views/Integrations/OceanProtocol/OceanProtocol.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/creators',
          name: 'Creators',
          component: () => import('./views/creators/Creators.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
        {
          path: '/feedback',
          name: 'Feedback',
          component: () => import('./views/cannio/Feedback.vue'),
          meta: {
            rule: 'isLogged',
          },
        },
        {
          path: '/user_details/:session_key?',
          name: 'User Details',
          component: () => import('./views/UserDetails/UserDetails.vue'),
          meta: {
            rule: 'isLogged',
          },
        },
      ],
    },
    // event-registration
    {
      path: '/event-registration/:cast_Id?',
      name: 'Event Register',
      component: () => import('./views/pages/event-register/EventRegister.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    // http://localhost:8080/e/creator/join/
    {
      path: '/e/creator/join/:cast_Id?',
      name: 'Joining',
      component: () => import('./views/Verification/CreatorJoin.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/joining/:meetingID?',
      name: 'Waiting Room',
      component: () => import('./views/JoinCast.vue'),
      meta: {
        rule: 'isPublic',
      },
      props: true,
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/register/Register.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/resetPassword',
      name: 'PasswordReset',
      component: () => import('./views/passwordReset/PasswordReset.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/login',
      name: 'LoginNew',
      component: () => import('./views/login/LoginNew.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: () => import('./views/register/SignUp.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/callback',
      name: 'Callback',
      component: () => import('./views/login/components/Callback.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/setUpCast',
      name: 'SetUpCast',
      component: () => import('../src/SetUpCasts/SetUpCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/recording/:id',
      name: 'recording',
      component: () =>
        import('../src/views/dashboard/components/RecordingPlayer'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/join-room/:meeting_id?',
      name: 'Joining Room',
      component: () => import('./views/joiningPage.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/join-cast/:meetingID?',
      name: 'Joining Cast',
      component: () => import('./views/JoinCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/live/:eventId?',
      name: 'Stream View',
      component: () => import('./views/dashboard/StreamView.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/consent',
      name: 'Consent',
      component: () => import('./views/login/components/Consent.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/login1',
      name: 'Login',
      component: () => import('./views/login/Login.vue'),
      meta: {
        rule: 'isPublic',
      },

      // children: [
      //   {
      //     path: '/login/',
      //     name: 'Login',
      //     component: () => import('@/views/login/components/Restricted.vue'),
      //     meta: {
      //       rule: 'isPublic',
      //       // layout: 'full',
      //       pageType: 'auth',
      //     },
      //   },
      // ],
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('./views/login/Calendar.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/color',
      name: 'ColorPicker',
      component: () => import('./views/login/ColorPicker.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/color',
      name: 'ColorPicker',
      component: () => import('./views/login/ColorPicker.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/password/reset/:token',
      name: 'Reset Password',
      component: () => import('@/views/passwordReset/Reset.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/popup',
      name: 'Reset Passwo',
      component: () => import('@/views/dashboard/Popups.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/middlepart',
      name: 'middlepart',
      component: () => import('@/views/HomePage/MiddlePart.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/privatecast',
      name: 'JoinPrivateCast',
      component: () => import('@/views/dashboard/JoinPrivateCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/public/nftdrop',
      name: 'NftMint',
      component: () => import('@/views/dashboard/NFT/NftMint.vue'),
      meta: {
        rule: 'isPublic',
      },
      props: route => ({
        castId: route.query.cast_id
      })
    },
    {
      path: '/nftdetails',
      name: 'NftDetails',
      component: () => import('@/views/dashboard/NFT/PopUps/NftDeatils.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/password/email',
      name: 'Reset Email',
      component: () => import('@/views/passwordReset/Reset.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/postCast',
      name: 'Post Cast',
      component: () => import('./views/postCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },

    {
      path: '/manage',
      name: 'Dashboard',
      component: () => import('./views/dashboard/Dashboard.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/leftpart',
      name: 'DashBoardLeftPart',
      component: () => import('./views/dashboard/components/LeftPart.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/middlePart',
      name: 'DashBoardMiddlePart',
      component: () => import('./views/dashboard/components/Room.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/AboutPage.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/navbar',
      name: 'Navbar',
      component: () => import('./views/Navbar.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/rightpart',
      name: 'rightpart',
      component: () => import('./views/dashboard/components/RightPart.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/dashboard',
      name: 'FullDashBoard',
      component: () => import('./views/dashboard/FullDashboard.vue'),
      meta: {
        rule: 'isLogged',
      },
    },
    {
      path: '/streamcard',
      name: 'StreamCard',
      component: () => import('./views/dashboard/StreamCard.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/invite',
      name: 'InviteCard',
      component: () => import('./views/dashboard/InviteCard.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/aboutUs',
      name: 'About',
      component: () => import('./views/dashboard/AboutPage.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/contactUs',
      name: 'Contact Us',
      component: () => import('./views/dashboard/ContactUs.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    // {
    //   path: '/fall',
    //   name: 'FallBox',
    //   component: () => import('./views/dashboard/FallBox.vue'),
    //   meta: {
    //     rule: 'isPublic',
    //   },
    // },
    {
      path: '/nftw',
      name: 'NftWallet',
      component: () => import('./views/dashboard/NFT/NftWallet.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/workwithus',
      name: 'WorkWithUs',
      component: () => import('./views/WorkWithUs.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/postpone',
      name: 'postPoneCast',
      component: () => import('./views/dashboard/postPoneCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    // -->>>>>>>>>
    {
      path: '/eventdetails/:eventId',
      name: 'Event Details',
      component: () => import('./views/eventdetails.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('./views/events/Events.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    // {
    //   path: '/live/:eventId',
    //   name: 'Stream Page',
    //   component: () => import('./views/events/StreamPage.vue'),
    //   meta: {
    //     rule: 'isPublic',
    //   },
    // },
    // {
    //   path: '/public/nftdrop',
    //   name: 'Public NFT Drop',
    //   component: () => import('./views/create-event/publicDropNfts.vue'),
    //   meta: {
    //     rule: 'isPublic',
    //   },
    // },
    {
      path: '/nftdrop',
      name: 'NFT Drop',
      component: () => import('./views/create-event/DropNfts.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/VC/:cast_id',
      name: 'Certificate',
      component: () => import('./views/create-event/GalaCertificate.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/profile',
      name: 'My Profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        rule: 'isLogged',
      },
    },
    {
      path: '/contact-us',
      name: 'Contact Us',
      component: () => import('./views/ContactUs.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/features',
      name: 'Features',
      component: () => import('./views/Features.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/faq',
      name: 'Faq',
      component: () => import('./views/Faq.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('./views/Pricing.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./views/Contact.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/loader',
      name: 'Loading',
      component: () =>
        import('../src/components/animatedloader/animatedLoader.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/studio/:videoId?',
          name: 'Studio',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
      ],
    },

    {
      // =============================================================================
      // VideoWiki Class LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/videowiki-class/Index.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/integrations/Room',
          name: 'Video Wiki Class Landing',
          component: () => import('./views/videowiki-class/Landing.vue'),
          meta: {
            rule: 'isPublic',
          },
        },
      ],
    },
    {
      path: '/error/not-authorized',
      component: () => import('./views/NotAuthorized.vue'),
    },
    {
      path: '/error/404',
      component: () => import('./views/Error404.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    {
      path: '/e/:meetingID?',
      name: 'Join Cast',
      component: () => import('./views/JoinCast.vue'),
      meta: {
        rule: 'isPublic',
      },
    },
    { path: '/error/500', component: () => import('./views/Error500.vue') },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error/404',
    },
  ],
});

router.afterEach((to, from) => {
  // Remove initial loading
  document.title = to.name;
});

export default router;
