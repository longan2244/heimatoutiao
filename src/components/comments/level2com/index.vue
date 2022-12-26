<template>
  <div class="level2com-container">
    <!-- 回复内容 -->
    <div class="artcom">
      <center><h5>回复</h5></center>

      <Comitem :item="item"></Comitem>
    </div>
    <van-divider />
    <!-- 被回复内容 -->
    <div class="replyartcom">
      <center><h5>回复内容</h5></center>
      <Comments :source="item.com_id" :type="'c'"></Comments>
    </div>
    <!-- 发布回复 -->
    <div class="goreplay">
      <Postcomponent :article_id="item.com_id" :art_id="art_id"></Postcomponent>
    </div>
  </div>
</template>

<script>
import Comitem from "@/components/comments/comitem/";
import Comments from "@/components/comments/index.vue";
import Postcomponent from "@/components/comments/postcomponent/index.vue";
export default {
  components: { Comitem, Comments, Postcomponent },
  name: "level2com",
  props: ["item", "art_id"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
.level2com-container {
  padding-bottom: 136px;
  .goreplay {
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
  h5 {
    color: rgb(100, 100, 100);
    font-size: 14px;
  }
}
</style>
