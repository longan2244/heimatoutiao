<template>
  <div class="editTheProfile-container">
    <div class="editTheProfile-head">
      <van-nav-bar
        title="编辑资料"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="editbody">
      <input
        type="file"
        @change="getsystemimage"
        ref="avatarinput"
        hidden
        accept="image/png, image/jpeg"
      />
      <van-cell title="头像" is-link center @click="$refs.avatarinput.click()">
        <template>
          <div class="avatarbox">
            <van-image
              round
              width="100%"
              height="100%"
              :src="userinfos.photo"
            />
          </div>
        </template>
      </van-cell>
      <van-cell
        @click="Isnicknameshow = true"
        title="昵称"
        center
        is-link
        :value="userinfos.name"
      />
      <van-cell
        title="性别"
        @click="Isgendershow = true"
        center
        is-link
        :value="gender"
      />
      <van-cell
        title="生日"
        @click="Isbirthdayshow = true"
        center
        is-link
        :value="userinfos.birthday"
      />
      <van-cell
        title="手机号"
        @click="$toast('不能修改')"
        center
        is-link
        :value="userinfos.mobile"
      />
    </div>
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="Isnicknameshow"
      get-container="body"
      position="bottom"
      :style="{ height: '100%' }"
      ><Nickname
        @shutDown="Isnicknameshow = false"
        v-model="userinfos.name"
      ></Nickname
    ></van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="Isgendershow" get-container="body" position="bottom"
      ><Genderfrom
        @shutDown="Isgendershow = false"
        v-model="userinfos.gender"
      ></Genderfrom
    ></van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="Isbirthdayshow" get-container="body" position="bottom">
      <Birthday
        @shutDown="Isbirthdayshow = false"
        v-model="userinfos.birthday"
      ></Birthday>
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup
      v-model="Isavatarshow"
      get-container="body"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Avatar
        @setstaticimg="userinfos.photo = $event"
        @shutDown="Isavatarshow = false"
        :imageobj="imageobj"
      ></Avatar>
    </van-popup>
  </div>
</template>

<script>
import { profileapi } from "@/api/user.js";
import Nickname from "@/components/editTheInformation/nickname/index.vue";
import Genderfrom from "@/components/editTheInformation/gender/index.vue";
import Birthday from "@/components/editTheInformation/birthday/index.vue";
import Avatar from "@/components/editTheInformation/avatar/index.vue";
export default {
  components: { Nickname, Genderfrom, Birthday, Avatar },
  name: "editTheProfile",
  props: [],
  data() {
    return {
      userinfos: {},
      Isnicknameshow: false,
      Isgendershow: false,
      Isbirthdayshow: false,
      Isavatarshow: false, //头像弹出层
      imageobj: null, //图片对象
    };
  },
  methods: {
    async profile() {
      try {
        let { data: res } = await profileapi();
        this.userinfos = res.data;
      } catch (error) {}
    },
    //获取系统图片
    getsystemimage() {
      let imageobj = this.$refs.avatarinput.files[0]; //获取文件对象
      this.imageobj = imageobj;
      this.Isavatarshow = true;
      // window.URL.createObjectURL(imageobj)
    },
  },
  computed: {
    gender() {
      return this.userinfos.gender == "0" ? "女" : "男";
    },
  },
  watch: {},
  created() {
    this.profile();
  },
  mounted() {},
};
</script>

<style lang='less' scpoed>
.editTheProfile-container {
  .van-cell__value {
    display: flex;
    justify-content: right;
  }
  .avatarbox {
    width: 40px;
    height: 40px;
  }
}
</style>
