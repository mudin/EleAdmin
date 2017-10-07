import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Ajax from './minix/ajax.js';
import App from './App.vue';
require('../api/index.js');

Vue.use(ElementUI);

Vue.config.productionTip = false;

window.bench = '/index.json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [
    Ajax
  ],
  template: '<App/>',
  components: { App }
});
