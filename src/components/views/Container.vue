<script>
export default {
  data() {
    return {
      com: {},
    };
  },
  methods: {
    /**
     * 发送跳转动作
     */
    redirect(action) {
      this.$root.$EventBus.emit(action.layer || 'Admin', action);
    },
    /**
     * 执行跳转
     */
    onRedirect(action) {
      // 本地处理
      return this.$HttpSend(action).then((response) => {
        this.com = response.view || 'Simple';
        this.afterRedirect(response);
        throw new Error('route');
      }).catch(() => {});
    },
    /**
     * 跳转完成钩子
     */
    afterRedirect() {
    },
  },
};
</script>

