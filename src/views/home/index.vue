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
          <!-- 汉堡 -->
          <template #nav-right>
            <div @click="TabEditshow = true" class="hbcd">
              <van-icon name="wap-nav" />
            </div>
          </template>
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

    <!-- 弹窗 -->
    <van-popup
      v-model="TabEditshow"
      closeable
      position="bottom"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <Tabedits :channelsList="channelsList" @goid="goids"></Tabedits>
    </van-popup>
  </div>
</template>

<script>
import { channelsapi } from "@/api/essay.js";
import EssayList from "@/components/essayList/index.vue";
import Tabedits from "@/components/tabEdits/index.vue";
export default {
  components: {
    EssayList,
    Tabedits,
  },
  name: "Home",
  props: [],
  data() {
    return {
      active: 0,
      channelsList: [],
      TabEditshow: true,
    };
  },
  methods: {
    async getchannels() {
      let { data: res } = await channelsapi();
      this.channelsList = res.data.channels;
    },
    goids(id) {
      console.log(id);
      this.TabEditshow = false;
      this.active = id;
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
  .tab {
    padding-right: 40px;
  }
  .hbcd {
    background-color: white;
    width: 40px;
    height: 43px;
    position: fixed;
    right: 0;
    text-align: center;
    line-height: 43px;
    opacity: 0.8;
    font-size: 20px;
    color: #333333;
  }
}
</style>
