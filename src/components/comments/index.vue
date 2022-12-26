<template>
  <div  class="comments-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Comitem
        class="comlists"
        v-for="item in results"
        :key="item.com_id"
        :item="item"
      >
      </Comitem>
    </van-list>
  </div>
</template>

<script>
import { commentsapi } from "@/api/essay";
import evtbus from "@/utils/evtbus";
import Comitem from "@/components/comments/comitem/index.vue";
export default {
  components: { Comitem },
  name: "comments",
  props: ["source", "type"],
  data() {
    return {
      results: [], //评论数据
      loading: false,
      finished: false,
      offset: null,
      limit: 10, //每页条数
    };
  },
  methods: {
    //获取评论
    async onLoad() {
      let { data: res } = await commentsapi({
        type: this.type || "a", // 如果没传则是查询 文章评论 传了就是查询二级评论
        source: this.source,
        offset: this.offset,
        limit: this.limit,
      });
      if (res.data.results.length == 0) {
        //数据完毕
        return (this.finished = true);
      }
      this.offset = res.data.last_id;
      this.results.push(...res.data.results);
      this.loading = false;
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    //来自于post评论数据 成功传过来的值
    evtbus.$on("newpostcom", (res) => {
      this.results.unshift(res.new_obj);
      //发送成功关闭底部弹出层
      this.$emit("postshow");
    });
  },
};
</script>

<style lang='less' scpoed>
</style>
