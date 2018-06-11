<script>
export default {
  data() {
    return {
      com: {},
    };
  },
  methods: {
    redirect(action) {
      this.$root.$EventBus.emit(action.redirect || 'Admin', action);
    },
    onRedirect(action) {
      // console.log('redirect', action);
      // 本地处理
      return this.$HttpSend(action).then((response) => {
        this.com = response.view || 'Simple';
        this.afterRedirect(response);
        throw new Error('route');
      }).catch(() => {});
    },
    afterRedirect() {
    },
    passUp(action) {
      return action && action.redirect;
    },
  },
};
</script>

