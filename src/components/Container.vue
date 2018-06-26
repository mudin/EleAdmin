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
      this.$root.$EventBus.emit(action.layer || this.$options.name || 'Admin', action);
    },
    /**
     * 执行跳转
     */
    onRedirect(action) {
      // 本地处理
      return this.$HttpSend(action).then((response) => {
        const rs = JSON.parse(JSON.stringify(response));
        this.com = rs.view || 'Simple';
        this.afterRedirect(rs);
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

