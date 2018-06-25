<script>

let Simple;

/** 视图组件父类 */
const View = {
  props: {
    view: {
      type: Object,
      default() {
        return {
          name: 'Simple',
        };
      },
    },
  },
  components: {
    Simple,
  },
};

/** 定义空白页面 */
Simple = {
  name: 'Simple',
  template: '<div class="center">{{view.message || ""}}</div>',
  extends: View,
};

export default View;
</script>
