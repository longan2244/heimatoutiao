<template>
  <div class="avatar-container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-right="onClickRight"
      @click-left="$emit('shutDown')"
    />
    <div class="avimgbox">
      <img class="avimg" ref="avimg" src="" alt="" />
    </div>
  </div>
</template>

<script>
import { avatarapi } from "@/api/user";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
export default {
  components: {},
  name: "avatar",
  props: ["imageobj"],
  data() {
    return {
      cropper: null, //裁剪实例
      Blob: null,
    };
  },
  methods: {
    //设置头像
    onClickRight() {
      this.cropper.getCroppedCanvas().toBlob(async (Blob) => {
        this.Blob = window.URL.createObjectURL(Blob);
        let fd = new FormData();
        fd.append("photo", Blob);
        let { data: res } = await avatarapi(fd);
        this.$emit("shutDown");
        this.$emit("setstaticimg", this.Blob);
      });
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$refs.avimg.src = window.URL.createObjectURL(this.imageobj); //设置预览图片
    let image = this.$refs.avimg;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
    });
  },
};
</script>

<style lang='less' scpoed>
.avatar-container {
  .avimgbox {
    display: block;
    max-width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
