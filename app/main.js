import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Ajax from './minix/ajax.js';
window.mockPath = '/element.php/admin/index/index';
window.httpServer = 'http://192.168.0.253';
// require('../api/index.js');

Vue.use(ElementUI);

Vue.config.productionTip = false;

window.createUrl = (url = '') => {
  if (!url) url = window.mockPath;
  return window.httpServer + url;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [Ajax],
  template: '<App/>',
  components: { App }
});
