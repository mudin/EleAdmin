<template>
  <el-card>
    <div slot="header">
      <span style="line-height: 36px;">安装协议</span>
    </div>
    <p>版权所有 (c) 鸿瑞科技服务有限责任公司保留所有权利。</p>
    <p>感谢您选择<a href="" target="_blank">Framework</a>，希望我们的努力能为您提供一个简单、强大的站点解决方案。</p>
    <p>用户须知：本协议是您与鸿瑞科技服务有限责任公司之间关于您使用Framework产品及服务的法律协议。无论您是个人或组织、盈利与否、用途如何（包括以学习和研究为目的），均需仔细阅读本协议，包括免除或者限制艺品网络责任的免责条款及对您的权利限制。请您审阅并接受或不接受本服务条款。如您不同意本服务条款及/或鸿瑞科技服务有限责任公司随时对其的修改，您应不使用或主动取消Framework产品。</p>
    <p>本服务条款一旦发生变更, 鸿瑞科技服务有限责任公司将在产品官网上公布修改内容。修改后的服务条款一旦在网站公布即有效代替原来的服务条款。您可随时登陆官网查阅最新版服务条款。如果您选择接受本条款，即表示您同意接受协议各项条件的约束。如果您不同意本服务条款，则不能获得使用本服务的权利。您若有违反本条款规定，鸿瑞科技服务有限责任公司有权随时中止或终止您对Framework产品的使用资格并保留追究相关法律责任的权利。</p>
    <p>在理解、同意、并遵守本协议的全部条款后，方可开始使用Framework产品。</p>
    <p>鸿瑞科技服务有限责任公司拥有Framework的全部知识产权，包括商标和著作权。我们允许您在遵守本协议各项条款的情况下复制、下载、安装、使用或者以其他方式受益于本软件的功能或者知识产权。</p>
    <p>Framework遵循鸿瑞科技服务有限责任公司开源协议，并且免费使用（但不包括其衍生产品、插件或者服务）。Apache Licence是著名的非盈利开源组织Apache采用的协议。该协议和BSD类似，鼓励代码共享和尊重原作者的著作权，允许代码修改，再作为开源或商业软件发布。需要满足的条件：<br/>
      1． 需要给用户一份Apache Licence ；<br/>
      2． 如果你修改了代码，需要在被修改的文件中说明；<br/>
      3． 在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明；<br/>
      4． 如果再发布的产品中包含一个Notice文件，则在Notice文件中需要带有本协议内容。你可以在Notice中增加自己的许可，但不可以表现为对Apache Licence构成更改。</p>
    <div class="el-form-item">
      <el-checkbox v-model="value.checked" @change="agreeLicence">
        <span>同意使用协议</span>
      </el-checkbox>
    </div>
  </el-card>
</template>

<script>
  import ElCard from '../../../node_modules/element-ui/packages/card/src/main.vue';

  export default {
    components: {ElCard},
    data () {
      return {
        value: {
          checked: false
        }
      };
    },
    methods: {
      agreeLicence () {
        this.$emit('activeNext', this.value.checked);
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
