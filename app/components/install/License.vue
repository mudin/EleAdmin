<template>
  <el-card>
    <div slot="header">
      <span style="line-height: 36px;">安装协议</span>
    </div>
    <p>版权所有 (c) {{company}}保留所有权利。</p>
    <p>感谢您选择<a :href="href" target="_blank">{{name}}</a>，希望我们的努力能为您提供一个简单、强大的站点解决方案。</p>
    <p>用户须知：本协议是您与{{company}}之间关于您使用{{name}}产品及服务的法律协议。请仔细阅读本协议。</p>
    <p>本服务条款一旦发生变更, {{name}}将在产品官网上公布修改内容。修改后的服务条款一旦在网站公布即有效代替原来的服务条款。您可随时登陆官网查阅最新版服务条款。</p>
    <p>在理解、同意、并遵守本协议的全部条款后，方可开始使用{{name}}产品。您若有违反条款规定，{{company}}有权随时中止或终止您对{{name}}产品的使用资格并保留追究相关法律责任的权利。</p>
    <p>{{company}}拥有{{name}}的全部知识产权，包括商标和著作权。</p>
    <p>目前采用Apache Licence。<br/>
     <div class="el-form-item">
      <el-checkbox v-model="checked" @change="agreeLicence">
        <span>同意使用协议</span>
      </el-checkbox>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      value: Object
    },
    data () {
      return {
        name: 'Framework',
        href: '#',
        company: '鸿瑞科技服务有限责任公司',
        checked: this.value.checked
      };
    },
    methods: {
      agreeLicence () {
        this.$emit('change', 'checked', this.checked);
        this.$emit('activeNext', this.checked);
      }
    }
  };
</script>

<style scoped>
  p {
    text-align: left;
  }
  .el-form-item {
    margin-top: 50px;
  }
</style>
