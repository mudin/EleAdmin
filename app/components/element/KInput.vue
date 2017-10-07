<template>
  <el-input v-model="value" :disabled="disabled">
      <template slot="prepend" v-if="label">{{label}}</template>
      <el-button slot="append" icon="edit" @click="disableMe()"> </el-button>
  </el-input>
</template>

<script>
  /**
   * 可以设置为无效的输入框
   */
  export default {
    props: {
      label: String,
      name: String,
      'default': {
        'default': () => {}
      },
      value: {
        'default': () => {}
      }
    },
    data () {
      return {
        disabled: true
      };
    },
    watch: {
      value (newValue) {
        if (!this.disabled) this.$emit('input', this.value);
      }
    },
    methods: {
      disableMe () {
        this.disabled = !this.disabled;
        if (this.disabled) {
          this.value = this.default;
          this.$emit('disableItem', this.name);
        }
      }
    }
  };
</script>

<style>
</style>
