<script>
  export default {
    data () {
      return {
        values: {}
      };
    },
    props: {
      config: Object
    },
    render: function (createElement) {
      let self = this;

      // 设置初值
      if (this.config.values) Object.assign(this.values, this.config.values);

      // 创建form子节点
      let children = (this.config.fields || []).map((field) => {
        /**
         * 表单域创建函数
         * @param {Object} field 表单域对象
         */
        function createField (field) {
          // 输入控件Tag
          let tag;
          // 输入控件属性
          let props = {};
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
          let child = [];
          if (field.options && cTag) {
            field.options.forEach((opt) => {
              child.push(createElement(cTag, {
                props: {
                  label: (labelIsValue) ? opt.value : opt.label,
                  value: opt.value
                },
                key: opt.value
              }, [opt.label]));
            });
          }

          /**
         * 数据输入响应处理 v-model
         */
          props.value = self.values[field.name];
          let on = {
            input: function (value) {
            // self.values[field.name] = value;
              self.$set(self.values, field.name, value);
            // self.$emit('input', value);
            }
          };

          return createElement(tag, {props, on}, child);
        }

        let props = {
          label: field.label,
          prop: field.name
        };
        return createElement('el-form-item', {props},
          [createField(field)]
        );
      });

      /**
       * 按钮创建函数
       * @param {string} label 按钮标签
       * @param {Function} func  响应函数
       */
      let submitButton = (label, func) => {
        return createElement('el-button',
          {
            on: {
              click: func.bind(self)
            }
          },
          [label]
        );
      };

      // 添加提交按钮
      if (self.config.inline) children.push(submitButton('搜索', self.handleSubmit));
      else {
        children.push(createElement('el-form-item', {}, [
          submitButton('提交', self.handleSubmit)
        ]));
      }

      // 表单属性
      let props = {};
      // 索引
      let ref = 'ruleForm';
      // 内联样式
      if (!self.config.inline) {
        props['label-width'] = (typeof (this.config.labelWidth) === 'undefined') ? '20%' : self.config.labelWidth;
      } else {
        props['inline'] = true;
      }
      // 自定义样式
      if (self.config.style) props['style'] = self.config.style;
      props.size = 'small';

      // 传递值 v-model
      props.value = self.values;
      props.model = self.values;
      let on = {
        input: function (values) {
          self.values = values;
        // self.$set(self, 'values', values);
        }
      };
      // 构建验证信息
      props.rules = {};
      Object.assign(props.rules, this.config.rules);
      // 这里用于自身属性遍历
      Object.keys(props.rules).forEach((key) => {
        (props.rules[key]).forEach((element) => {
          if (element.validator) element.validator = self[element.validator];
        });
      });

      this.form = createElement(
        'el-form',
        {
          on,
          props,
          ref
        },
        children
      );

      return this.form;
    },
    created () {
    },
    watch: {
      // values (v) {
      //   let o = {};
      //   Object.keys(v).forEach((key) => {
      //     o[key] = v[key] + '';
      //   });
      // }
    },
    components: {
      'WEditor': function index (resolve) {
        require(['../element/WEditor.vue'], resolve);
      },
      KCascader: function index (resolve) {
        require(['../element/KCascader.vue'], resolve);
      }
    },
    computed: {
      // fields () {
      //   return this.config.fields || [];
      // },
      // rules () {
      //   let rs;
      //   Object.assign(rs, this.config.rules);
      //   // 这里用于自身属性遍历
      //   Object.keys(rs).forEach((key) => {
      //     rs[key].forEach((element) => {
      //       if (element.validator) element.validator = this[element.validator];
      //     });
      //   });
      //   return rs;
      // }
    },
    methods: {
      handleReset () {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
          // GET跳转
          // if (this.config.moniter) return this.$root.monitor(this.config.redirect, this.values);

          // 内联搜索表单
            if (this.config.inline) {
              this.$emit('search', this.values);
              this.$refs.ruleForm.resetFields();
              return;
            }

            // POST提交后跳转
            this.$root.ajaxer({url: this.config.url, post: true}, this.values).then((data) => {
              this.$emit('monitor', {url: data.next || this.config.next});
            });
          } else {
            this.$notify.error({
              title: '消息',
              message: '数据验证未通过'
            });
            return false;
          }
        });
      },
      validatePassword (rule, value, callback) {
        if (value !== this.config.values[rule.name]) {
          callback(new Error(rule.message || '两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      validateAsync (rule, value, callback) {
        this.$root.ajax(rule, value).then((data) => {
          if (data.status) {
            callback();
          } else {
            callback(new Error(data.error || rule.message || '请修改'));
          }
        }, (error) => {
          callback(new Error(error));
        });
      }
    }
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
