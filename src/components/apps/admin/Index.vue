<template>
  <el-container id="admin">
    <el-aside width="240px">
      <div class="logo"><img src="../assets/logo.png" /></div>
      <div><H2 class="title">后台管理系统</H2></div>
      <el-aside @redirect="redirect" :menus="menus"/>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <h5 class="title">{{title}}</h5>
        <div class="user">
        <el-command commands="user.commands">
          <span class="userinfo-inner" slot="prefix">
            <i class="el-icon-setting"></i> {{user.name || '用户'}} <i class="el-icon-arrow-down"></i>
          </span>
        </el-command>
      </el-header>
      <component :view="com" v-bind:is="com.name" />
    </el-container>
  </el-container>
</template>

<script>
import ElAside from './views/ElAside';
import Father from './views/Container';
import PannelView from './views/PannelView';
import TableView from './views/TableView';
import VeForm from './views/VeForm';
import ElChart from './elements/ElChart';
import ChartView from './views/ChartView';
import TreeView from './views/TreeView';
import ElCommand from './view/ElCommand';
import View from '../views/View';

export default {
  name: 'Admin',
  extends: Father,
  mixins: [View],
  data() {
    return {
      user: {},
      menus: [],
      title: '管理首页',
    };
  },
  components: {
    Aside,
    PannelView,
    TableView,
    ElChart,
    User,
    VeForm,
    ChartView,
    TreeView,
  },
  created() {
    // 挂载跳转处理器
    this.$root.$EventBus.on('Admin', this.onRedirect.bind(this));
    // 刷新页面
    this.$nextTick(() => {
      this.onRedirect(this.view);
    });
  },
  methods: {
    afterRedirect(response) {
      if (response.user) this.user = response.user;
      if (response.menus) this.menus = response.menus;
      if (response.title) this.title = response.title;
    },
  },
};
</script>

<style scoped>
#admin {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.el-header, .el-footer {
  display: flex;
  color: #333;
  align-items: center;
  justify-content: space-between;
}

.el-header {
  /* background-color: #545c64; */
  background-color: #243638;
}

.el-footer {
  background-color: #B3C0D1;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
}

.user {
  color: #E9EEF3;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
  padding-left: 10px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  overflow: auto;
}

.el-container {
  overflow: auto;
}

.logo {
  margin: 20px 0;
}

.title {
  color: #FFFFFF;
}
</style>
