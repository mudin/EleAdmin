<script>

import Simple from './Simple';

/** 视图组件父类 */
const View = {
  name: 'View',
  props: {
    view: {
      type: Object,
      default() {
        return {
          name: 'Simple',
          message: '什么情况',
        };
      },
    },
  },
  components: {
    Simple,
  },
};

export default View;
</script>
