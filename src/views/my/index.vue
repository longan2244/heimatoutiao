<template>
  <div class="my-container">
    <div class="my-head">
      <!-- 未登录 -->
      <div
        v-if="!usertokeninfo"
        @click="$router.push('/login')"
        class="notLoggedIn"
      >
        <span class="iconfont icon-profile"></span>
        <span class="prompt">登录 / 注册</span>
      </div>
      <!-- 已登录 -->
      <div v-else class="loggedIn">
        <!-- 基础资料 -->
        <div class="baseinfo">
          <div class="avatarbox">
            <img :src="currentuserinfo.photo" alt="" />
          </div>
          <span class="username">{{ currentuserinfo.name }}</span>
          <span class="editinfo">编辑资料</span>
        </div>
        <!-- 数值资料 -->
        <div class="datainfo">
          <ul>
            <li>
              <span class="number">{{ currentuserinfo.like_count }}</span>
              <span class="affairs">点赞</span>
            </li>
            <li>
              <span class="number">{{ currentuserinfo.follow_count }}</span>
              <span class="affairs">关注</span>
            </li>
            <li>
              <span class="number">{{ currentuserinfo.fans_count }}</span>
              <span class="affairs">粉丝</span>
            </li>
            <li>
              <span class="number">{{ currentuserinfo.art_count }}</span>
              <span class="affairs">获赞</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="my-nav">
      <!-- 收藏 -->
      <div class="collection">
        <span class="iconfont icon-like"></span>
        <span class="affairs">收藏</span>
      </div>
      <!-- 历史 -->
      <div class="history">
        <span class="iconfont icon-time"></span>
        <span class="affairs">历史</span>
      </div>
    </div>
    <div class="my-column">
      <div class="column">
        <span class="affairs">消息通知</span>
        <span class="iconfont icon-list-right"></span>
      </div>
      <div class="column">
        <span class="affairs">小智同学</span>
        <span class="iconfont icon-list-right"></span>
      </div>
    </div>
    <div v-if="usertokeninfo" @click="loginout" class="my-loginout">
      <van-button color="white" class="loginoutbtn" type="primary" block
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getuserinfoapi } from "@/api/user";
export default {
  components: {},
  name: "My",
  props: [],
  data() {
    return {
      currentuserinfo: {}, //用户信息
    };
  },
  methods: {
    // 退出登录
    loginout() {
      this.$dialog
        .confirm({
          title: "确认退出",
          message: "确认退出吗",
        })
        .then(() => {
          // 清除token  vuex 和 本地
          this.$store.commit("SETUSERTOKENINFOIO", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取用户信息
    async getuserinfo() {
      try {
        let { data: res } = await getuserinfoapi();
        this.currentuserinfo = res.data;
      } catch (error) {
        this.$toast("未登录");
      }
    },
  },
  computed: {
    ...mapState(["usertokeninfo"]),
  },
  watch: {},
  created() {
    this.getuserinfo();
  },
  mounted() {},
};
</script>
<style lang='less' scpoed>
.my-container {
  // 头部
  .my-head {
    padding-top: 58px;
    background-color: #3296fa;
    opacity: 0.9;
    margin-bottom: 4px;
    .notLoggedIn {
      height: 201px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 66px;
        color: white;
      }
      .prompt {
        padding-top: 18px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .baseinfo {
      padding: 0 16px 20px 16px;
      height: 3rem;
      display: flex;
      align-items: center;
      // background-color:;
      .avatarbox {
        width: 75px;
        height: 75px;
        border-radius: 75px;
        overflow: hidden;
        border: #edeff3 1px solid;
        img {
          width: 100%;
          vertical-align: middle;
        }
      }
      .username {
        padding-left: 11px;
        flex: 1;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .editinfo {
        float: right;
        width: 58px;
        height: 17px;
        text-align: center;
        line-height: 17px;
        background-color: #ffffff;
        border-radius: 8px;
        font-size: 10px;
        color: #666666;
      }
    }
    .datainfo {
      height: 68px;
      ul {
        display: flex;
        height: 100%;
        li {
          color: white;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .number {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            padding-bottom: 10px;
          }
          .affairs {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
  }
  //nav区域
  .my-nav {
    height: 72px;
    // background-color: red;
    margin-bottom: 4px;
    display: flex;
    .collection::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 51px;
      background-color: #edeff3;
    }
    .collection,
    .history {
      background-color: white;
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 23px;
        color: #eb5253;
        padding-bottom: 8px;
      }
      .affairs {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
      }
    }
  }
  //用户操作区域
  .my-column {
    background-color: white;
    .column {
      margin: 0 16px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.5px solid #edeff3;
      .affairs {
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
      }
      .iconfont {
        color: #9f9f9f;
      }
    }
  }
  //退出登录
  .my-loginout {
    margin-top: 5px;
    .van-button__text {
      color: #d86262;
    }
  }
}
</style>
















