<template>
  <div class="Essayitem-container">
    <div class="title">
      <div class="van-multi-ellipsis--l3">
        {{ itemdata.title }}
      </div>
      <!-- 1个图时候 -->
      <div class="imgbox1" v-if="itemdata.cover.type == 1">
        <van-image width="100%" height="100%" :src="itemdata.cover.images[0]" />
      </div>
    </div>
    <!-- 3个图片时候 -->
    <div class="imgbox3" v-if="itemdata.cover.type == 3">
      <div
        class="imgitem"
        v-for="(item, index) in itemdata.cover.images"
        :key="index"
      >
        <van-image width="100%" height="100%" :src="item" />
      </div>
    </div>
    <!-- 帖子信息 -->
    <div class="essinfo">
      <span v-show="itemdata.is_top != 0">置顶</span>
      <span>{{ itemdata.aut_name }}</span>
      <span>{{ itemdata.comm_count }}评论</span>
      <span>{{ releaseTime }}</span>
    </div>
  </div>
</template>
<script>
import { parseTime } from "@/utils/dayjs";
export default {
  components: {},
  name: "Essayitem",
  props: ["itemdata"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    //处理时间
    releaseTime() {
      // 2019-03-11 09:00:00 to  4分钟前
      return parseTime(this.itemdata.pubdate);
    },
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
.Essayitem-container {
  .title {
    display: flex;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3a3a3a;
    margin-bottom: 15px;
  }
  .van-multi-ellipsis--l3 {
    flex: 1;
  }
  .imgbox1 {
    width: 116px;
    height: 73px;
  }
  .imgbox3 {
    display: flex;
    height: 73px;
    .imgitem {
      padding: 0 2px;
      flex: 1;
    }
  }
  .essinfo span {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 1px;
    color: #999999;
    padding: 0 1px;
  }
  .essinfo span:nth-child(1) {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #e22829;
  }
}
</style>
