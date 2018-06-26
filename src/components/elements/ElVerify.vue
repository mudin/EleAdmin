<template>
  <div class="el-verify-box">
    <div><el-input type="verify" :placeholder="placeholder"
    v-model="v" /></div>
    <div class="el-verify-img"><img alt="点击切换" :src="src" @click="reload"></div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: '验证码',
    },
  },
  data() {
    const src = this.$HttpUrl(this.url);
    return {
      src,
    };
  },
  computed: {
    v: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    reload() {
      this.src = `${this.src}/?random=${Math.random()}`;
    },
  },
};
</script>

<style scoped>
.el-verify-box {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.el-verify-img {
  margin: 10px 0;
}
</style>
