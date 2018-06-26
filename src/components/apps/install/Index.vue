<script>
import License from './License';
import StepView from '../../views/StepView';

export default {
  extends: { StepView },
  components: {
    License,
  },
  methods: {
    /**
     * 完成后的动作
     */
    handleComplete() {
      this.$root.ajaxer({ url: this.view.url }, this.value, true).then(() => {
        this.$emit('monitor', this.view.admin);
      }, () => {
        this.handlePreStep();
      });
    },
  },
};
</script>
