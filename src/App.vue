<template>
  <div id="app">
    <!-- 路由出口 -->
    <keep-alive :include="this.VUEPAGE">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["VUEPAGE"]),
  },
};
</script>
<style lang="less">
</style>
