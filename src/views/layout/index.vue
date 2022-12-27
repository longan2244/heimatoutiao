<template>
  <div>
    <!-- 路由出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {},
  name: "Layout",
  props: [],
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    ...mapMutations(["ADDVUEPAGE"]),
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.ADDVUEPAGE("Layout");
  },
};
</script>

<style lang='less' scpoed>
</style>
