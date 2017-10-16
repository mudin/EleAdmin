<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">管理员</span>
    </div>
    <el-form ref="form" :model="admin" label-width="0"  :rules="rules">
      <el-form-item prop="name">
        <el-input type="text" v-model="admin.name">
          <template slot="prepend">超级管理员</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="admin.password">
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="text" v-model="admin.email">
          <template slot="prepend">Email</template>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    props: {
      value: Object
    },
    data () {
      return {
        admin: this.value.admin,
        rules: {
          name: [{required: true, message: '管理员名称不能为空', trigger: 'blur'}],
          password: [
            {required: true, min: 6, max: 20, message: '请输入密码(长度为6-20)', trigger: 'blur'}
          ],
          email: [
            {type: 'email', required: true}
          ]
        }
      };
    },
    mounted () {
      this.$watch('admin', () => {
        this.$refs['form'].validate((valid) => {
          console.log('6666');
          // this.$emit('change', 'db', this.db);
          this.$emit('activeNext', !!(valid));
        });
      }, {
        deep: true
      });
    },
    methods: {
    }
  };
</script>
