<template>
  <el-row>
    <el-col :span="10"><el-input v-model="pk" :disabled="disabled"></el-input></el-col>
    <el-col :span="4">-</el-col>
    <el-col :span="10"><el-input v-model="pv" :disabled="disabled"></el-input></el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      value: Object,
      disabled: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        pk: '',
        pv: ''
      };
    },
    computed: {

    },
    created () {
      //
    },
    watch: {
      value () {
        this.pk = this.value.label || '';
        this.pv = this.value.value || '';
      },
      pv () {
        this.$set(this.value,'value',this.pv);
        this.$emit('input', this.value);
      },
      pk () {
        this.$set(this.value,'label',this.pk);
        this.$emit('input', this.value);
      }
    }
  };
</script>

<style>
</style>
