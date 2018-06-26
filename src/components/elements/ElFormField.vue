<script>
import emitter from 'element-ui/src/mixins/emitter';
import ElPair from './ElPair';
import ElAutoput from './ElAutoput';
import ElVerify from './ElVerify';

export default {
  render(createElement) {
    const self = this;
    // props
    const props = this.item || {};
    props.value = this.value;
    props.disabled = this.disabled;
    // children
    let children;
    let holder = this.item.holder || 'input';
    switch (holder) {
      case 'text':
        holder = 'input';
        break;
      case 'textare':
        holder = 'input';
        props.type = 'textarea';
        break;
      case 'password':
        holder = 'input';
        props.type = 'password';
        break;
      case 'time-range':
        holder = 'el-time-picker';
        props.isRange = true;
        break;
      case 'date-range':
      case 'data-time-range':
        holder = 'el-date-picker';
        break;
      case 'radio-group':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-radio', {
          props: {
            label: element.value,
            disabled: element.disabled,
          },
        }, [element.label])));
        break;
      case 'checkbox-group':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-checkbox', {
          props: {
            label: element.value,
            disabled: element.disabled,
          },
        }, [element.label])));
        break;
      case 'select':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-option', {
          props: element,
        })));
        break;
      default:
    }
    return createElement(`el-${holder}`, {
      props,
      on: {
        input: self.input.bind(self),
      },
    }, children);
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    value: {
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ElPair,
    ElAutoput,
    ElVerify,
  },
  methods: {
    input(value) {
      this.$emit('input', this.item.name, value);
    },
  },
  mixins: [emitter],
};
</script>
