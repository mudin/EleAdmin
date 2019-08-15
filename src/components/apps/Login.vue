<template>
  <div class="login-view">
    <h1 class="login-title">{{title}}</h1>
    <ve-form
      :view="form"
      :value="value"
      class="login-form"
      :onSubmit="onSubmit"
    />admin: admin
  </div>
</template>

<script>
import VeForm from '../views/VeForm';
import View from '../views/View';

export default {
  extends: View,
  data() {
    const self = this;
    return {
      title: self.view.title || 'VeAdmin管理后台',
      form: self.view.form || {},
      value: {},
    };
  },
  components: {
    VeForm,
  },
  methods: {
    onSubmit(data) {
      // eslint-disable-next-line
      // data.password = U.md5(data.password);
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

