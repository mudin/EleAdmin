<template>
  <el-container>
    <el-aside width="260px"><slider :menus="menus" @menu="monitor">
      <div class="logo" slot="logo"><i :class="logoIcon"></i> {{title}}</div>
    </slider></el-aside>
    <el-container>
      <el-header height="62px">
        <span>{{viewTitle}}</span>
        <div class="user">
          <el-dropdown @command="monitor" @visible-change="setDropdownIcon">
            <span class="el-dropdown-link">
              {{username}} <i :class="dropdownIcon"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="item in commands" :key="item.index">
                <i :class="dropdownItemIcon"></i><span class="el-item">{{item.label}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <component :config="view" v-bind:is="view.name" @monitor="monitor"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Slider from './view/Slider.vue';

export default {
  components: {
    JTable: function index (resolve) {
      require(['./view/JTable.vue'], resolve);
    },
    JForm: function index (resolve) {
      require(['./view/JForm.vue'], resolve);
    },
    JTree: function index (resolve) {
      require(['./view/JTree.vue'], resolve);
    },
    Simple: function index (resolve) {
      require(['./Simple.vue'], resolve);
    },
    Module: function index (resolve) {
      require(['./module/Index.vue'], resolve);
    },
    //    KMelect: function index (resolve) {
    //      require(['./element/KMelect.vue'], resolve);
    //    },
    //    Apple: function index (resolve) {
    //      require(['./Apple.vue'], resolve);
    //    },
    Chart: function (resolve) {
      require(['./element/KChart.vue'], resolve);
    },
    Slider
  },
  props: {
    config: Object
  },
  watch: {},
  data () {
    return {
      user: {
        name: '管理员'
      },
      commands: [],
      menus: [],
      view: {},
      dropdownIcon: 'el-icon-setting'
    };
  },
  created () {
    this.reload(this.config);
  },
  computed: {
    logoIcon () {
      return this.config.logoIcon || 'el-icon-menu';
    },
    title () {
      return this.config.title || '管理后台';
    },
    viewTitle () {
      return this.view.title || '首页';
    },
    username () {
      return this.user.nickname || this.user.name;
    },
    dropdownItemIcon (item) {
      return item.icon || 'el-icon-menu';
    }
  },
  methods: {
    monitor (cmd) {
      // 跳转
      if (cmd.exit) return this.$emit('monitor', cmd);
      // 更新管理页面
      this.reload(cmd);
    },
    reload (cmd) {
      // 默认url
      if (cmd.url === true) cmd.url = this.config.url;
      // 获取框架信息
      this.$root.ajaxer(cmd).then((response) => {
        if (response.user) this.user = response.user;
        if (response.menus) this.menus = response.menus;
        if (response.commands) this.commands = response.commands;
        if (response.view) this.view = response.view;
      });
    },
    setDropdownIcon (i) {
      this.dropdownIcon = (i ? 'el-icon-caret-bottom' : 'el-icon-setting');
    }
  }
};
</script>

<style lang="less">
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    /* text-align: center;
    line-height: 200px;*/

    .el-menu {
      border: 0;
    }

    .logo {
      /* margin: 0 20px 30px 20px;
      padding: 20px 20px 10px 20px; */
      height: 60px;
      color: #ffffff;
      font-size: 20px;
      border-bottom: 2px solid #c2c4ce;
      line-height: 58px;
      text-align: center;
    }
  }

  .el-header {
    background-color: #ffffff;
    padding: 20px;
    padding-right: 40px;
    color: #474747;
    text-align: left;
    font-size: 14px;
    border-bottom: 2px solid #545c64;

    .user {
      float: right;
      color: #999999;
    }
  }
@slider-width: 260px;
@all-height: 790px;
@all-width: 1440px;
@all-padding: 30px;
.layout {
  .slider {
    width: @slider-width;
    top: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    background-color: #4c4f5a;

    .logo {
      margin: 0 20px 30px 20px;
      padding: 20px 20px 10px 20px;
      height: 44px;
      color: #ffffff;
      font-size: 20px;
      border-bottom: 2px solid #c2c4ce;
    }
  }
  .main {
    position: fixed;
    left: @slider-width;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #f4f4f4;

    .top {
      height: 24px;
      background-color: #ffffff;
      padding: 20px;
      padding-right: 40px;
      color: #474747;
      text-align: left;
      font-size: 14px;

      .user {
        float: right;
        color: #999999;
      }
    }

    .content-main {
      position: absolute;
      top: @all-padding + 64px;
      bottom: @all-padding;
      left: @all-padding;
      right: @all-padding;
      background-color: #ffffff;
      overflow-y:scroll;
      padding: 20px;
    }
  }
}

.el-item {
  padding-left: 10px;
  font-size: 14px;
  color: #777777;
}
</style>
