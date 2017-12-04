<template>
  <div class="login-wrap">
    <div class="ms-title">{{config.title || '后台管理系统'}}</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="verify">
          <el-input type="verify" placeholder="验证码" v-model="ruleForm.verify"></el-input>
        </el-form-item>
        <el-form-item>
          <img alt="点击切换" :src="verifyImg" @click="reloadVerify">
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submit">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from './md5.min.js';
export default {
  data () {
    let validateAjax = (rule, value, callback) => {
      this.$root.ajaxer(this.config.checkUrl, {value}).then(() => {
        callback();
      }, () => {
        callback(new Error('验证失败'));
      });
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        verify: '精准扶贫'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        verify: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {validator: validateAjax, trigger: 'blur'}
        ]
      },
      verifyImg: ''
    };
  },
  props: {
    config: Object
  },
  computed: {
    //
  },
  created () {
    this.reloadVerify();
  },
  methods: {
    submit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.ruleForm.password = md5(this.ruleForm.verify + md5(this.ruleForm.password));
          this.$root.post(this.config.action, this.ruleForm);
        }
      });
    },
    reloadVerify () {
      // this.$root.ajaxer(this.config.verifyUrl + '?random=' + Math.random()).then((data) => {
      //   this.verifyImg = data;
      // });
      this.verifyImg = window.createUrl(this.config.verifyUrl + '?random=' + Math.random());
    }
  }
};
</script>

<style scoped>
.login-wrap{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #324157;
}
.ms-title{
  position: absolute;
  top:50%;
  width:100%;
  margin-top: -300px;
  text-align: center;
  font-size:30px;
  color: #fff;
}
.ms-login{
  position: absolute;
  left:50%;
  top:50%;
  width:300px;
  height:360px;
  margin:-220px 0 0 -190px;
  padding:40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn{
  text-align: center;
}
.login-btn button{
  width:100%;
  height:36px;
}
</style>
