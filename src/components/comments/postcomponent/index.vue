<template>
  <div class="postcomponent-container">
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <div class="compost">
      <van-button type="primary" @click="postcom" block>发布</van-button>
    </div>
  </div>
</template>

<script>
import { postcommentsapi } from "@/api/essay.js";
import evtbus from "@/utils/evtbus";
export default {
  components: {},
  name: "postcomponent",
  props: ["article_id", "art_id"],
  data() {
    return {
      content: "", //输入框内容
    };
  },
  methods: {
    //发布评论
    async postcom() {
      let { data: res } = await postcommentsapi({
        target: this.article_id,
        content: this.content,
        art_id: this.art_id || null,
      });
      evtbus.$emit("newpostcom", res.data);
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
.postcomponent-container {
  .van-field__control {
    background-color: rgb(233, 233, 233);
    border-radius: 2px;
    position: relative;
  }
  .compost {
    padding: 8px 16px;
  }
  .van-field__word-limit {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
