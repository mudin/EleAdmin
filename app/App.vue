<template>
  <div id="app">
    <component :config="view" v-bind:is="view.name"/>
    <trace :trace="trace"/>
  </div>
</template>

<script>

import Trace from './components/Trace.vue';

export default {
  name: 'app',
  data () {
    return {
      view: {},
      trace: {}
    };
  },
  components: {
    Trace,
    Admin: function index (resolve) {
      require(['./components/Admin.vue'], resolve);
    },
    Login: function index (resolve) {
      require(['./components/Login.vue'], resolve);
    },
    Simple: function index (resolve) {
      require(['./components/Simple.vue'], resolve);
    },
    Module: function index (resolve) {
      require(['./components/module/Index.vue'], resolve);
    },
    Install: function index (resolve) {
      require(['./components/Install/Index.vue'], resolve);
    }
  },
  /**
   * 类似 created 函数不要使用箭头函数
   */
  created: function () {
    let self = this;
    this.$root.ajaxer = function (url = '', data = {}, post = false) {
      return self.$root.ajax(url, data, post).then((response) => {
        self.trace = response.__trace__ || {};
        // 这里是为了级联then
        return response;
      });
    };
    /**
     * 返回Promise是为了统一返回值
     */
    this.$root.monitor = function (url = '', data = {}) {
      return self.$root.ajaxer(url, data).then((response) => {
        self.view = response.view || {
          name: 'Simple',
          message: response.message
        };
        throw new Error('route');
      }).catch(() => {});
    };
    // 启动
    this.$nextTick(() => {
      self.$root.monitor();
    });
  },
  beforeDestroy () {
    delete this.$root.monitor;
    delete this.$root.ajaxer;
  }
};
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    overflow:hidden;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
  }
</style>
