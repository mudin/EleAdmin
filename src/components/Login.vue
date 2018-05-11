<template>
  <div class="login-view">
    <h1 class="login-title">{{title}}</h1>
    <ve-form :view="form" :value="value"
    class="login-form" />
  </div>
</template>

<script>
import DemoForm from './views/DemoForm';
import VeForm from './views/VeForm';

export default {
  props: ['view'],
  data() {
    return {
      title: 'VeAdmin管理后台',
      form: {
        url: '/login.json',
        fields: [
          {
            index: 'user-name',
            label: '用户名',
            name: 'name',
            colWidth: 200,
            sortable: true,
            editable: true,
            editUrl: '/table/edit/name.json',
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
            url: '/verify.json',
            rule: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { validator: 'validateAsync', trigger: 'blur', url: '/verify/check.json' },
            ],
          },
        ],
        redirect: 'App',
      },
      value: {},
    };
  },
  components: {
    DemoForm,
    VeForm,
  },
  methods: {
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

