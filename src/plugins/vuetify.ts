import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#028090',
        accent: '#00a896',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
