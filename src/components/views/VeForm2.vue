<script>
export default {
  data() {
    return {
      values: {},
    };
  },
  props: {
    view: Object,
  },
  render(createElement) {
    const self = this;

    // 设置初值
    if (this.view.values) Object.assign(this.values, this.view.values);

    /** 表单域创建函数
     * @param {Object} field 表单域对象
     */
    function createField(field) {
      // 输入控件Tag
      let tag;
      // 输入控件属性
      const props = {};
      if (field.placeholder) props.placeholder = field.placeholder;
      // 子节点Tag
      let cTag;
      // element不一致性的兼容处理
      let labelIsValue = false;

      switch (field.holder) {
        case 'text':
          tag = 'el-input';
          break;
        case 'password':
          tag = 'el-input';
          props.type = 'password';
          break;
        case 'checkbox':
          tag = 'el-checkbox-group';
          cTag = 'el-checkbox';
          labelIsValue = true;
          if (typeof self.values[field.name] === 'undefined') self.$set(self.values, field.name, []);
          break;
        case 'radio':
          tag = 'el-radio-group';
          cTag = 'el-radio';
          labelIsValue = true;
          break;
        case 'textarea':
          tag = 'el-input';
          break;
        case 'cascader':
          tag = 'k-cascader';
          break;
        case 'select':
          tag = 'el-select';
          cTag = 'el-option';
          break;
        case 'editor':
          tag = 'w-editor';
          break;
        case 'switch':
          tag = 'el-switch';
          break;
        case 'datetime':
          tag = 'el-date-picker';
          break;
        case 'date':
          tag = 'el-date-picker';
          break;
        case 'time':
          tag = 'el-time-picker';
          break;
        default:
          tag = 'el-input';
      }

      // 子节点-选项
      const child = [];
      if (field.options && cTag) {
        field.options.forEach((opt) => {
          child.push(createElement(cTag, {
            props: {
              label: (labelIsValue) ? opt.value : opt.label,
              value: opt.value,
            },
            key: opt.value,
          }, [opt.label]));
        });
      }

      /**
     * 数据输入响应处理 v-model
     */
      props.value = self.values[field.name];
      const on = {
        input(value) {
          self.$set(self.values, field.name, value);
        },
      };

      return createElement(tag, { props, on }, child);
    }

    // 创建form子节点
    const children = (this.view.fields || []).map((field) => {
      const props = {
        label: field.label,
        prop: field.name,
      };
      return createElement('el-form-item', { props }, [createField(field)]);
    });

    /** 按钮创建函数
     * @param {string} label 按钮标签
     * @param {Function} func  响应函数
     */
    const submitButton = (label, func) => createElement('el-button', {
      on: {
        click: func.bind(self),
      },
    }, [label]);

    // 添加提交按钮
    if (self.view.inline) children.push(submitButton('搜索', self.handleSubmit));
    else {
      children.push(createElement('el-form-item', {}, [submitButton('提交', self.handleSubmit)]));
    }

    // 表单属性
    const props = {};
    // 索引
    const ref = 'ruleForm';
    // 内联样式
    if (!self.view.inline) {
      props['label-width'] = this.view.labelWidth ? '20%' : self.view.labelWidth;
    } else {
      props.inline = true;
    }
    // 自定义样式
    if (self.view.style) props.style = self.view.style;
    props.size = 'small';

    // 传递值 v-model
    props.value = self.values;
    props.model = self.values;
    const on = {
      input(values) {
        self.values = values;
      },
    };
    // 构建验证信息
    props.rules = {};
    Object.assign(props.rules, this.view.rules);
    // 这里用于自身属性遍历
    Object.keys(props.rules).forEach((key) => {
      (props.rules[key]).forEach((element) => {
        // eslint-disable-next-line
        if (element.validator) element.validator = self[element.validator];
      });
    });

    this.form = createElement('el-form', {
      on,
      props,
      ref,
    }, children);

    return this.form;
  },
  components: {
    // 'WEditor': function index (resolve) {
    //   require(['../element/WEditor.vue'], resolve);
    // },
    // KCascader: function index (resolve) {
    //   require(['../element/KCascader.vue'], resolve);
    // },
  },
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 内联搜索表单
          if (this.view.inline) return this.$emit('search', this.values);

          // POST提交后跳转
          const url = this.view.url;
          return this.$HttpSend({ url, post: true }, this.values).then((data) => {
            this.$emit('monitor', { url: data.next || this.view.next });
          });
        }
        return this.$notify.error({
          title: '消息',
          message: '数据验证未通过',
        });
      });
    },
    validatePassword(rule, value, callback) {
      if (value !== this.view.values[rule.name]) {
        callback(new Error(rule.message || '两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    validateAsync(rule, value, callback) {
      this.$HttpSend(rule, value).then(() => callback());
    },
  },
};
</script>

<style scoped>
  .el-form--inline>* {
    margin-right:10px
  }

  .el-form--inline .el-form-item {
    /*display: inline-block;*/
    margin-right: 10px;
    vertical-align: middle;
  }
</style>
