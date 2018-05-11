const Rank = {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    /** 按钮动作
     *
     * @param {Object} action
     * @param {?Object} value
     */
    ajax(action, value) {
      // 跳转
      if (action.next) {
        const act = action;
        act.value = value;
        act.url = act.url || act.next;
        return this.$root.$EventBus.emit('Admin', act);
      }
      // 提交后刷新
      return this.load(action.url, value).then(() => this.getData());
    },
    /** 修改单元格
     *
     * @param {Object} row
     * @param {Object} col
     * @param {String|Number} v
     */
    edit(row, col, v) {
      this.load(col.editUrl, {
        col: col.name,
        id: row.id,
        value: v,
      }).then((data) => {
        // eslint-disable-next-line
        row[col.name] = data.value;
      });
    },
    /**
     * 远程获取数据
     *
     * @param {String} url
     * @param {?Object} params
     */
    load(url, params = null) {
      this.loading = true;
      return this.$HttpGet(url, params).then((data) => {
        this.loading = false;
        return data;
      }, () => {
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
  },
};

export default Rank;
