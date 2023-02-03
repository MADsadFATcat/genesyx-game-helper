import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

Vue.config.productionTip = false;

new Vue({
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
