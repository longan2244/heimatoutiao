<template>
  <div class="EssayList-container" ref="EssayList-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in EssayList"
          :key="index"
          @click="$router.push(`/article/${item.art_id}`)"
        >
          <div>
            <Essayitem :itemdata="item"></Essayitem>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { articlesapi } from "@/api/essay.js";
import Essayitem from "@/components/essayItem/index.vue";
import { debounce } from "lodash"; //导入loadsh插件
export default {
  components: {
    Essayitem,
  },
  name: "EssayList",
  props: {
    id: {
      require: true,
    },
  },
  data() {
    return {
      EssayList: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: Date.now(), //时间戳
      scrollTop: 0, //滚动位置
    };
  },
  methods: {
    async onLoad() {
      let { data: res } = await articlesapi(this.id, this.timestamp);
      // 回来后先设置下一次时间戳
      this.timestamp = res.data.pre_timestamp;
      //push数据
      this.EssayList.push(...res.data.results);
      //数据回来后
      this.loading = false;
      // ########全部数据加载完成 没有后
      if (res.data.results.length == 0) {
        this.finished = true;
      }
    },
    async onRefresh() {
      let { data: res } = await articlesapi(this.id, this.timestamp);
      // 回来后先设置下一次时间戳
      this.timestamp = res.data.pre_timestamp;
      //unshift数据
      this.EssayList.unshift(...res.data.results);
      //复原
      this.isLoading = false;
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let dom = this.$refs["EssayList-container"];
    // 监听滚动 距离;
    dom.onscroll = debounce(() => {
      this.scrollTop = dom.scrollTop;
    }, 50);
  },
  activated() {
    // 设置滚动 距离
    let dom = this.$refs["EssayList-container"];
    dom.scrollTop = this.scrollTop;
  },
};
</script>

<style lang='less' scpoed>
.EssayList-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
