<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="menu in menus">
        <el-submenu :index="menu.index" v-if="menu.items" :key="menu.index">
          <template slot="title"><i :class="getIcon(menu.icon)"></i>{{menu.label}}</template>
          <el-menu-item v-for="item in menu.items"
           :index="item.index" @click="send(item)" :key="item.index">
            <i :class="getIcon(item.icon)"></i>{{item.label}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="menu.index" @click="send(menu)" :key="menu.index" v-else>
          <i :class="getIcon(menu.icon)"></i>{{menu.label}}
        </el-menu-item>
      </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  methods: {
    send(item) {
      this.$emit('redirect', item);
    },
    getIcon(icon = 'el-icon-menu') {
      return icon;
    },
  },
};
</script>

<style scoped>
/*去掉菜单最右边的白框，个人习惯*/
.el-menu {
  border-right: 0;
  text-align: left;
}
</style>
