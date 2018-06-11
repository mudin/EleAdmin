<template>
  <div class="login-view">
    <h1 class="login-title">{{title}}</h1>
    <ve-form :view="form" :value="value"
    class="login-form" :onSubmit = 'onSubmit'/>
  </div>
</template>

<script>
import VeForm from './views/VeForm';

const U = require('../Util/Md5.js');

// console.log(md5);

export default {
  props: ['view'],
  data() {
    const self = this;
    return {
      title: self.view.title || 'VeAdmin管理后台',
      form: {
        url: self.view.url,
        fields: [
          {
            index: 'user-name',
            label: '用户名',
            name: 'name',
            colWidth: 200,
            sortable: true,
          }, {
            index: 'user-password',
            label: '密码',
            name: 'password',
            colWidth: 100,
            holder: 'password',
          }, {
            index: 'user-verify',
            label: '验证码',
            name: 'verify',
            colWidth: 100,
            holder: 'verify',
            url: self.view.verifyImgUrl,
            rule: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { validator: 'validateAsync', trigger: 'blur', url: self.view.verifyCheckUrl },
            ],
          },
        ],
        redirect: 'App',
      },
      value: {},
    };
  },
  components: {
    VeForm,
  },
  methods: {
    onSubmit(data) {
      // eslint-disable-next-line
      data.password = U.md5(data.verify.toLowerCase() + U.md5(data.password));
      return data;
    },
  },
};
</script>


<style scoped>
.login-view {
  display: flex;
  flex: 1;
  background-color: dimgrey;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-title {
  color: #ffffff;
}
.login-form {
  background-color: #ffffff;
  padding: 40px 40px 30px 20px;
  border-radius: 10px;
}
</style>

