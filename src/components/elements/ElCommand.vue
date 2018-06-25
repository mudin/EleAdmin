<template>
  <el-dropdown trigger="click" @command="exeCommand">
    <slot name="prefix">
    </slot>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :divided="item.divided"
        v-for="item of commands"
        :key="item.index"
        :command="item"
      >
        <span>{{item.label}}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
    <slot name="suffix">
    </slot>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    commands: {
      type: Array,
      default: [],
    },
  },
  methods: {
    exeCommand(cmd) {
      this.$emit('redirect', cmd);
    },
  },
};
</script>


<style scoped>
</style>
