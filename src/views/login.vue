<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-form
      @submit="onlogin"
      @failed="onfailed"
      :show-error-message="false"
      :show-error="false"
      validate-first
      ref="userinfofrom"
    >
      <!-- 输入框 -->
      <div class="login-input-warp">
        <van-cell-group>
          <van-field
            v-model="userinfo.mobile"
            left-icon="phone-o"
            placeholder="请输入手机号"
            :rules="loginrules.mobile"
            name="mobile"
          />
          <van-field
            v-model="userinfo.code"
            clearable
            left-icon="comment-o"
            placeholder="请输入验证码"
            name="code"
            :rules="loginrules.code"
          >
            <template #button>
              <van-count-down
                v-if="Iscountdownshow"
                :time="1000 * 60"
                format="ss s"
              />
              <van-button
                v-else
                native-type="button"
                round
                size="mini"
                type="primary"
                @click="onsendSms"
                :disabled="IssendSmsshow"
                >发送验证码</van-button
              >
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="login-btn-warp">
        <van-button type="primary" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginapi, sendSmsapi } from "@/api/user";
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  components: {},
  name: "Login",
  props: [],
  data() {
    return {
      userinfo: {
        mobile: "15756242392", //账号
        code: "246810", //验证码
      },
      Iscountdownshow: false, //是否显示倒计时
      IssendSmsshow: false, //是否禁用发送验证码
      //验证规则
      loginrules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码为6位小数" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["REMOVEVUEPAGE"]),
    //验证码发送
    async onsendSms() {
      this.IssendSmsshow = true; //一进来禁用验证码按钮
      try {
        await this.$refs.userinfofrom.validate("mobile");
        //表单通过
        await sendSmsapi(this.userinfo.mobile);
        //显示倒计时
        this.Iscountdownshow = true;
        this.toptoast("发送验证码成功");
        //发送成功
      } catch (error) {
        this.Iscountdownshow = false; //失败关闭倒计时
        this.IssendSmsshow = false; //关闭发送验证码按钮禁用
        // 表单不通过
        if (error.name === "mobile") {
          return this.toptoast(error.message);
        }
        this.toptoast("发送验证码过于频繁");
      }
    },
    // 提示文本
    vantlodin() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
    },
    // 顶部提示文本
    toptoast(message) {
      Toast({
        position: "top", //在顶部显示
        message,
      });
    },
    //表单验证失败
    onfailed(error) {
      this.toptoast(error.errors[0].message);
    },
    // 登录方法
    async onlogin() {
      this.vantlodin();
      try {
        let { data: res } = await loginapi(this.userinfo);
        this.SETUSERTOKENINFOIO(res.data);
        Toast.success("成功登陆");
        // 清除缓冲
        this.REMOVEVUEPAGE("Layout")
        this.$router.push("/my")
      } catch (error) {
        return Toast.fail(error);
      }
    },
    ...mapMutations(["SETUSERTOKENINFOIO"]), //存放token相关方法
    //获取验证码
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
//大按钮
.login-btn-warp {
  padding: 27px 14px;
  button {
    background-color: #3296fa;
    border: 0;
  }
}
//验证码按钮
.van-field__button {
  button {
    background-color: #3296fa;
    border: 0;
  }
}
</style>


