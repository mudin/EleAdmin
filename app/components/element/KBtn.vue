<template>
  <el-button :size="size" :disabled="btnDisable"
    :type="getSwitchValue('type')"
    @click="handleAction"
    :plain="plain">
    {{getSwitchValue('label')}}
  </el-button>
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
        'default': () => { return {}; }
      },
      /**
       * 作为独立按钮时定义是否选中
       */
      hasSelected: {
        type: Boolean,
        'default': false
      },
      /**
       * 按钮外观样式
       */
      plain: {
        type: Boolean,
        'default': false
      },
      /**
       * 按钮大小
       */
      size: {
        type: String,
        'default': undefined
      }
    },
    computed: {
      btnDisable: function () {
        // 独立按钮 || 行按钮
        return (this.act.multiSelect && !this.hasSelected) || (this.act.disable && this.row[this.act.disable]);
      }
    },
    // 需要添加刷新消息
    methods: {
      handleAction () {
        this.act.url = this.getSwitchValue('url');
        this.$emit('action', this.act, this.row);
      },
      getSwitchValue (key) {
        if (this.act.switch) return this.act[key][Number(this.row[this.act.switch])];
        return this.act[key];
      }
    }
  };
</script>

<style>
</style>
