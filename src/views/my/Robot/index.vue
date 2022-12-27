<template>
  <div class="robot-container">
    <div class="robothead">
      <van-nav-bar
        title="小智同学"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="robotlist" ref="robotlist">
      <van-cell-group>
        <van-cell v-for="item in robot_and_user_msg" :key="item.timestamp">
          <template v-if="!item.ISrobot">
            <span class="fr">：我</span>
            <span class="fr">{{ item.msg }}</span>
          </template>
          <template #icon v-if="item.ISrobot">
            <div>机器人：{{ item.msg }}</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="robotinpu">
      <van-field v-model="msg" center clearable placeholder="请输入消息">
        <template #button>
          <van-button size="small" @click="sendmsg" type="primary"
            >发送</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/index.js";
import io from "socket.io-client";
export default {
  components: {},
  name: "robot",
  props: [],
  data() {
    return {
      socket: null,
      msg: "",
      robot_and_user_msg: getItem("robot_and_user_msg") || [], //用户数据 和 机器人数据
    };
  },
  methods: {
    //每次发送消息到最下面
    scroll() {
      this.$nextTick(() => {
        let dom = this.$refs.robotlist;
        dom.scrollTop = dom.scrollHeight;
      });
    },

    // 初始化socket
    initsocket() {
      // client-side
      this.socket.on("connect", () => {
        console.log("连接成功"); // x8WIv7-mJelg7on_ALbx
      });
       this.socket.on("disconnect", () => {
        console.log("断开连接"); // undefined
      });
    },
    //发送消息
    sendmsg() {
      let usermsg = {
        msg: this.msg,
        timestamp: Date.now(),
      };
      this.robot_and_user_msg.push(usermsg);
       this.socket.emit("message", usermsg);
    },
  },
  computed: {},
  watch: {
    robot_and_user_msg: {
      handler() {
        setItem("robot_and_user_msg", this.robot_and_user_msg);
        this.scroll();
      },
    },
  },
  created() {
    this.socket = io("http://toutiao.itheima.net", {
      query: {
        token: getItem("usertokeninfo").token,
      },
      transports: ["websocket"],
    });
    this.initsocket();
  },
  mounted() {
    //接受到了消息
     this.socket.on("message", (data) => {
      this.robot_and_user_msg.push({
        ISrobot: true,
        ...data,
      });
    });
    //一进来就滚动到顶部
    this.scroll();
  },
};
</script>

<style lang='less' scpoed>
.robot-container {
  .robotlist {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 52px;
    top: 46px;
    overflow-y: auto;
  }
  .robotinpu {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
