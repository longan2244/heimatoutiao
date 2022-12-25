<template>
  <div class="res-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        @click="$router.push(`/article/${item.art_id}`)"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { resapi } from "@/api/essay";
export default {
  components: {},
  name: "Res",
  props: ["seachtext"],
  data() {
    return {
      list: [],
      page: 1,
      total_count: "",
      loading: false,
      finished: false,
    };
  },
  methods: {
    async onLoad() {
      let { data: res } = await resapi({
        q: this.seachtext,
        page: this.page,
      });
      if (res.data.results.length == 0) {
        return (this.finished = true);
      }
      this.list.push(...res.data.results);
      this.loading = false; // 加载状态结束
      this.page += 1; //页码++
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
</style>
