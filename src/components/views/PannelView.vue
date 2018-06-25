<template>
  <pannel>
    <component v-for="item in view.items" :key="item.index"
    :is="item.name" :slot="item.slot" :view="item"/>
  </pannel>
</template>

<script>
import Pannel from './Pannel';
import View from './View';

export default {
  extends: View,
  components: [
    Pannel,
  ],
};
</script>
