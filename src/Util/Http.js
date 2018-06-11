import $http from 'axios';
import Qs from 'qs';

/**
 * 提供远程访问
 *
 */
class Http {
  /**
   * @type {Vue} 保存传进来的全局Vue对象
   */
  static vue;

  /**
   * 钩子格式定义
   * @typedef Receiver
   * @type {Function}
   * @param {Object} data
   */

  /**
   * @type {Receiver[]} 保存钩子数组
   */
  static receivers = [];

  /**
   * Url装配函数格式
   * @typedef UrlMaker
   * @type {Function}
   * @param {string} url
   * @returns {string}
   */

  /**
   * @type {UrlMaker} 自定义Url装配函数接口，通过在全局Vue实例中自定义Url装配函数实现定制
   */
  static createUrl = url => url;

  /**
   * 参数过滤,过滤没用的GET参数
   *
   * @param {string} value 原参数
   * @param {Object} filter {key, value} 有效性定义
   * @returns {Object}
   */
  static Filter = (value, filter) => {
    let realfilter = filter;
    if (filter === true) realfilter = 'id';
    if (typeof filter === 'string') realfilter = [{ key: filter, value: 'id' }];
    const fp = {};
    realfilter.forEach((v) => { fp[v.key] = value[v.value || v.key]; });
    return fp;
  }

  /**
   * 远程调用的核心方法
   * @returns {Promise<T>}
   */
  static HttpSend = (action = {}) => {
    /** @type {boolean} */
    const withValue = action && action.value;
    const option = {
      url: Http.createUrl((action) ? action.url : undefined),
    };
    if (action && action.post) {
      option.method = 'post';
      if (withValue) option.data = Qs.stringify(action.value);
      option.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    } else {
      if (withValue) option.params = JSON.parse(JSON.stringify(action.value));
      option.method = 'get';
    }
    // 开启跨域cookie
    option.withCredentials = true;
    option.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'brackets' });
    console.log('send', option);
    return $http(option).then((response) => {
      const data = response.data;
      return Http.onReceive(data);
    }).catch();
  };

  /**
   * 触发钩子函数
   * @type {Function}
   * @param {Object}  data
   * @returns {Object}
   */
  static onReceive = (data) => {
    Http.receivers.forEach(receiver => receiver(data));
    return data;
  }

  /**
   * 插件安装函数
   */
  static install(Vue) {
    this.vue = Vue;

    this.createUrl = this.vue.createUrl || (url => url);

    this.vue.prototype.$HttpUrl = url => this.createUrl(url);
    this.vue.prototype.$HttpGet = (url, value = null) => this.HttpSend({ url, value });
    this.vue.prototype.$HttpPost = (url, value = null) => this.HttpSend({ url, value, post: true });
    this.vue.prototype.$HttpSend = Http.HttpSend;

    this.vue.prototype.$addReceiver = receiver => this.receivers.push(receiver);

    this.vue.prototype.$removeReceiver = id => this.receivers.splice(id, 1);
  }
}

export default Http;
