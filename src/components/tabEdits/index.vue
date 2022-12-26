<template>
  <div class="tabEdits-container">
    <!-- 我的频道 -->
    <div class="mytab">
      <van-cell title="我的频道">
        <template #right-icon>
          <van-button
            plain
            type="primary"
            round
            class="editbtn"
            size="mini"
            @click="isedits = !isedits"
            >{{ isedits ? "完成" : "编辑" }}</van-button
          >
        </template>
      </van-cell>
      <div class="mytablist">
        <ul>
          <li
            v-for="(item, index) in channelsList"
            :key="item.id"
            @click="userclickchannels(item, index)"
          >
            {{ item.name }}
            <span v-if="isedits" class="iconfont purge icon-close"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 频道推荐 -->
    <div class="alltab">
      <van-cell title="推荐频道" />
      <div class="alltablist">
        <ul @click="allchannelsItem">
          <li
            v-for="item3 in recommendTab"
            :key="item3.id"
            :id="item3.id + ',' + item3.name"
          >
            {{ item3.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { allchannelsapi } from "@/api/essay";
export default {
  components: {},
  name: "Tabedits",
  props: ["channelsList"], //我的频道
  data() {
    return {
      allchannelsList: [], //所有频道
      isedits: false, //控制编辑
    };
  },
  methods: {
    // 获取所有频道
    async getallchannels() {
      let { data: res } = await allchannelsapi();
      this.allchannelsList = res.data.channels;
    },
    //用户点击全部频道追加个人频道
    allchannelsItem(e) {
      if (e.target.localName != "li") return;
      let clickarr = e.target.id.split(",");
      this.channelsList.push({ id: parseInt(clickarr[0]), name: clickarr[1] });
    },
    //用户点击我的频道
    userclickchannels(data, index) {
      if (this.isedits) {
        this.clickdelete(data, index);
      } else {
        this.clickgo(data, index);
      }
    },
    // 删除频道
    clickdelete(data, index) {
      this.channelsList = this.channelsList.filter((item) => {
        return item.id != data.id;
      });
    },
    //去频道
    clickgo(data, index) {
      this.$emit("goid", index);
    },
  },
  computed: {
    //计算剩余频道
    recommendTab() {
      return this.allchannelsList.filter((item) => {
        return !this.channelsList.some((item2) => {
          return item.id === item2.id;
        });
      });
    },
  },
  watch: {},
  created() {
    this.getallchannels();
  },
  mounted() {},
};
</script>

<style lang='less' scpoed>
.tabEdits-container {
  padding: 43px 0px 0px 12px;
  .mytab {
    .editbtn {
      padding: 10px 20px;
    }
    .mytablist ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        margin: 7px 6px;
        height: 43px;
        width: 75px;
        background-color: #f4f5f6;
        border-radius: 3px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 1px;
        color: #222222;
        text-align: center;
        line-height: 43px;
      }
      .purge {
        color: red;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid red;
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .alltab {
    .alltablist ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 7px 6px;
        height: 43px;
        width: 75px;
        background-color: #f4f5f6;
        border-radius: 3px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 1px;
        color: #222222;
        text-align: center;
        line-height: 43px;
      }
    }
  }
}
</style>
