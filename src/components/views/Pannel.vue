<template>
  <div class="pannel">
    <div class="line top"><slot name="top"/></div>
    <div class="line">
      <div class="cell left"><slot name="left"/></div>
      <div class="cell"><slot name="content"/></div>
      <div class="cell right"><slot name="right"/></div>
    </div>
    <div class="line foot"><slot name="foot"/></div>
  </div>
</template>
<script>
/**
 * Pannle 实现了一个3,3的布局
 *   |————————————————————————————|
 *   |            top             |
 *   |————————————————————————————|
 *   |    |                 |     |
 *   |left|     content     |right|
 *   |    |                 |     |
 *   |————————————————————————————|
 *   |           right            |
 *   |————————————————————————————|
 */
</script>

<style scoped>
.pannel {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.line {
  display: flex;
  flex-direction: row;
  margin-top: 18px;
}
.cell {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.top {
  margin-top: 0;
}
.left, .right {
  flex-grow: 0;
}
.left {
  background-color: brown;
}
.right {
  background-color: aqua;
}
</style>

