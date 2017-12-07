<template>
  <div class="slider">
    <slot name="logo"></slot>
    <el-menu :unique-opened="true"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <template v-for="menu in menus">
        <el-submenu :index="menu.index" v-if="menu.menus">
          <template slot="title"><i :class="getIcon(menu.icon)"></i>{{menu.label}}</template>
          <el-menu-item :index="item.index" v-for="item in menu.menus" @click="send(item)" :key="item.index">
            {{item.label}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="menu.index" @click="send(menu)" :key="menu.index" v-else>
          {{menu.label}}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  props: {
    menus: Array
  },
  methods: {
    send (item) {
      this.$emit('menu', item);
    },
    getIcon (icon = 'menu') {
      return 'el-icon-' + icon;
    }
  }
};
</script>

<style>
</style>
