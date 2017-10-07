import $http from 'axios';
import Qs from 'qs';

export default {
  methods: {
    /**
     * 基础接口 POST函数
     *
     * @param url 提交地址
     * @param value 参数
     * @param next 提交后跳转地址
     *
     */
    post (url, value = {}, next = false) {
      let act = {url: url, post: true};
      return this.action(act, value).then((data) => {
        let to = (data && data.next) || next;
        if (to) this.$root.monitor(to);
      });
    },

    /**
     * 基础接口 GET函数
     *
     * @param act
     * @param value
     *
     * @return Promise
     *
     */
    handleAction (act, value = {}) {
      /**
       * 提示动作
       *
       * @param config
       * @param func
       *
       */
      let handleConfirm = (config, func) => {
        this.$confirm(config.msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(func).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      };
      if (act.confirm) {
        return handleConfirm(act.confirm, () => {
          return this.action(act, value);
        });
      } else {
        return this.action(act, value);
      }
    },

    /**
     * 核心处理函数
     *
     * @param act
     * @param value
     *
     * @return Promise
     */
    action (act, value) {
      // 用于form提交
      if (act.post) {
        return this.ajax(act.url, value, true);
      }

      // 用于在线按钮
      if (act.api) {
        return this.ajax(act.url, queryStringFilter(value, act.api));
      }

      // 带id跳转
      if (act.key) {
        return this.$root.monitor(act.url, queryStringFilter(value, act.key));
      } else {
        return this.$root.monitor(act.url);
      }
    },

    ajax (url, value = null, post = false) {
      let option = {
        method: post ? 'post' : 'get',
        url
      };
      if (post) {
        option.data = Qs.stringify(value);
        option.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      } else if (value !== null) {
        option.params = JSON.parse(JSON.stringify(value));
      }
      // console.log(option);

      return new Promise((resolve, reject) => {
        $http(option).then(response => {
          let data = response.data;
          // 判断返回结果信息
          if (data.status && Number(data.status) < 0) {
            throw new Error(data.message || '操作失败');
          }
          resolve(data);
        }, (error) => {
          reject(error);
          throw new Error('数据获取失败');
        }).catch((error) => {
          this.$message({
            type: 'warning',
            message: error.message || '操作失败'
          });
        });
      });
    },
    /**
     * 直接跳转
     *
     * @param url 目标跳转地址
     */
    location (url) {
      window.location.href = url;
    }
  }
};

/**
 * queryString过滤
 */
function queryStringFilter (value, filter) {
  if (filter === true) filter = 'id';
  if (typeof filter === 'string') filter = [{key: filter, value: 'id'}];
  let fp = {};
  filter.forEach((v) => { fp[v.key] = value[v.value]; });
  return fp;
}
