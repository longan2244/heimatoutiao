<template>
  <div class="search-container">
    <div class="Resflex">
      <van-search
        v-model="seachtext"
        @search="onSearch"
        placeholder="请输入搜索关键词"
        @focus="isResshow = false"
      ></van-search>
    </div>
    <!-- 搜索结果 -->
    <Res :seachtext="seachtext" v-if="isResshow"></Res>
    <!-- 联想建议 -->
    <Sug
      :seachtext="seachtext"
      v-else-if="seachtext"
      @onSearch="onSearch"
    ></Sug>
    <!-- 历史记录 -->
    <History  @onSearch="onSearch" :HistoryList="History" v-else></History>
  </div>
</template>
<script>
import Sug from "@/components/seach/sug.vue";
import History from "@/components/seach/history.vue";
import Res from "@/components/seach/res.vue";
import { getItem, setItem } from "@/utils/index.js";
import { mapState } from "vuex";
import { seachhistoryapi } from "@/api/essay";
import { uniq } from "lodash";
export default {
  components: {
    Sug,
    History,
    Res,
  },
  name: "search",
  props: [],
  data() {
    return {
      isResshow: false,
      seachtext: "",
      History: getItem("HistoryList") || [], //历史记录
    };
  },
  methods: {
    // 搜索时调用
    onSearch(item) {
      this.seachtext = item; //点击建议触发
      // 将历史记录保存 如果存在就不保存
      let flag = !this.History.some((item) => {
        return item == this.seachtext;
      });
      if (flag) this.History.unshift(this.seachtext);
      setItem("HistoryList", this.History); //本地存储
      this.isResshow = true;
    },
    //请求在线历史记录
    async historyonlie() {
      let res = await seachhistoryapi();
      let nows = uniq([...this.History, ...res]); //去重
      this.History = nows;
      setItem("HistoryList", nows); //本地存储
    },
  },
  computed: {
    ...mapState(["usertokeninfo"]),
  },
  watch: {},
  created() {
    if (this.usertokeninfo) {
      this.historyonlie(); //在线
    }
  },
  mounted() {},
};
</script>

<style lang='less' scpoed>
.search-container {
  padding-top: 54px;
  .Resflex {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
