<template>
  <el-button
    :disabled="btnDisable"
    :type="type"
    @click="onClick"
    :round="round"
    :icon="icon"
    size="mini"
  >{{label}}</el-button>
</template>

<script>
/**
  * 具有自切换功能的【行/独立】按钮
  */
export default {
  props: {
    /**
      * 按钮定义
      */
    act: Object,
    /**
      * 按钮所在行数据
      */
    row: {
      type: Object,
      default() { return {}; },
    },
    /**
      * 作为独立按钮时定义是否选中
      */
    multiSelect: {
      type: Boolean,
      default: false,
    },
    /**
      * 按钮外观样式
      */
    inline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnDisable() {
      // 独立按钮 || 行按钮
      return (this.act.multiSelect && !this.multiSelect) ||
        (this.act.disable && !this.row[this.act.disable]);
    },
    round() {
      return this.inline ? undefined : true;
    },
    label() {
      return this.getSwitchValue('label');
    },
    type() {
      return this.getSwitchValue('type');
    },
    icon() {
      return this.getSwitchValue('icon');
    },
  },
  // 需要添加刷新消息
  methods: {
    onClick() {
      this.act.url = this.getSwitchValue('switchUrl');
      this.$emit('action', this.act, this.row);
    },
    getSwitchValue(key) {
      if (this.act.switch) return this.act[key][this.row[this.act.switch] ? 1 : 0];
      return this.act[key];
    },
  },
};
</script>

<style>
</style>
