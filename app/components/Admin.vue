<template>
  <el-container>
    <el-aside width="260px"><slider :menus="menus" @menu="handle">
      <div class="logo" slot="logo"><i class="el-icon-menu"></i> {{config.title || '管理后台'}}</div>
    </slider></el-aside>
    <el-container>
      <el-header height="62px">
        <span>{{mate.title || '后台'}}</span>
        <div class="user">
          <el-dropdown @command="handle" @visible-change="setDropdownIcon">
            <span class="el-dropdown-link">
              {{user.nickname||user.name}} <i :class="dropdownIcon"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="item in commands" :key="item.index">
                <i class="el-icon-ion-ios-browsers"></i><span class="el-item">{{item.label}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <component :config="mate" v-bind:is="mate.view" @refresh="handle"></component>
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
    //    KMelect: function index (resolve) {
    //      require(['./element/KMelect.vue'], resolve);
    //    },
    //    Apple: function index (resolve) {
    //      require(['./Apple.vue'], resolve);
    //    },
    //    Chart: function index (resolve) {
    //      require(['./element/KChart.vue'], resolve);
    //    },
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
      mate: {},
      dropdownIcon: 'el-icon-setting'
    };
  },
  created () {
    this.mate = this.config;
    this.reload(this.config.url);
  },
  computed: {
  },
  methods: {
    handle (cmd) {
      // 重载管理页面
      if (cmd.reload) return this.reload(cmd.reload);
      // 跳转
      this.$root.monitor(cmd.url, cmd.data);
    },
    reload (url) {
      // 默认url
      if (url === true) url = this.config.url;
      // 获取框架信息
      this.$root.ajaxer(url, {}).then((data) => {
        if (data.user) this.user = data.user;
        if (data.menus) this.menus = data.menus;
        if (data.commands) this.commands = data.commands;
        if (data.config) this.mate = data.config;
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
