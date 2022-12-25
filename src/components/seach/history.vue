<template>
  <div class="history-container">
    <van-cell title="历史记录">
      <template #default>
        <div>
          <!-- 删除图标 -->
          <div v-if="!isdeleteShow" @click="isdeleteShow = true">
            <van-icon name="delete-o" />
          </div>
          <!-- 点击删除图标 -->
          <div v-else>
            <span @click="del('all')"> 全部删除 </span
            ><span @click="isdeleteShow = false"> 完成</span>
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in HistoryList"
      :key="index"
      :title="item"
      @click="isdeleteShow ? del(index) : go(item)"
    >
      <template #default>
        <div>
          <van-icon name="close" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { setItem, removeItem } from "@/utils/index";
export default {
  components: {},
  name: "History",
  props: ["HistoryList"],
  data() {
    return {
      isdeleteShow: false,
    };
  },
  methods: {
    // 删除
    del(index) {
      if (index == "all") {
        this.HistoryList = [];
        return removeItem("HistoryList");
      }
      let newhs = this.HistoryList.filter((item, indexs) => {
        return index != indexs;
      });
      this.HistoryList = newhs;
      setItem("HistoryList", newhs);
      //清除设置并且同步到本地存储
    },
    //点击搜索
    go(item) {
      this.$emit("onSearch", item);
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
