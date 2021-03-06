// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App';
import Http from './Util/Http';
import EventBus from './Util/EventBus';

// 后台服务器地址
window.host = 'http://192.168.0.253';
// 服务器入口
window.index = '/element.php/admin/index/index';

require('./api/mock');

Vue.createUrl = url => window.host + (url || window.index);

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(Http);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  created() {
    this.$EventBus = EventBus;
  },
});
