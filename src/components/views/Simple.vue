<template>
  <div class="center">{{view.message || ""}}</div>
</template>

<script>

export default {
  name: 'Simple',
  props: ['view'],
};
</script>

