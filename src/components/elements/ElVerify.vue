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
    return {
      src: '',
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
  created() {
    this.reload();
  },
  methods: {
    reload() {
      this.$HttpGet(this.url, { random: Math.random() }).then((src) => {
        this.src = src;
      });
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
