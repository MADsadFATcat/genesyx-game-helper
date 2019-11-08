import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

Vue.config.productionTip = false;

new Vue({
  // @ts-ignore
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
