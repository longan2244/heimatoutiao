<template>
  <div class="Home">
    <div class="Home-head">
      <div class="seach">
        <van-nav-bar>
          <template #title>
            <van-button>搜索</van-button>
          </template>
        </van-nav-bar>
      </div>
    </div>
    <div class="bodys">
      <div class="tab">
        <van-tabs v-model="active" color="#3296fa">
          <van-tab
            v-for="item in channelsList"
            :key="item.id"
            :title="item.name"
          >
            <EssayList :id="item.id"></EssayList>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { channelsapi } from "@/api/essay.js";
import EssayList from "@/components/essayList/index.vue";
export default {
  components: {
    EssayList,
  },
  name: "Home",
  props: [],
  data() {
    return {
      active: 0,
      channelsList: [],
    };
  },
  methods: {
    async getchannels() {
      let { data: res } = await channelsapi();
      this.channelsList = res.data.channels;
    },
  },
  computed: {},
  watch: {},
  created() {
    //获取频道
    this.getchannels();
  },
  mounted() {},
};
</script>

<style lang='less' scpoed>
.Home {
  .seach {
    .van-nav-bar__content {
      background-color: #3296fa;
    }
    .van-nav-bar__title {
      max-width: unset;
    }
    .van-button {
      width: 278px;
      height: 32px;
      background-color: rgb(255, 255, 255);
      border-radius: 16px;
      color: #ccc;
    }
  }
}
</style>
