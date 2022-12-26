<template>
  <div class="nickname-container">
    <van-nav-bar
      title="修改昵称"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$emit('shutDown')"
      @click-right="onClickRight"
    />
    <van-field
      v-model="localvalue"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>
<script>
import { editprofileapi } from "@/api/user";
export default {
  components: {},
  name: "nickname",
  props: ["value"],
  data() {
    return {
      localvalue: this.value,
    };
  },
  methods: {
    // 修改昵称
    async onClickRight() {
      try {
        await editprofileapi({
          name: this.localvalue,
        });
        //修改成功
        this.$emit('shutDown')
        this.$emit("input",this.localvalue)
      } catch (error) {
        console.log(error);
      }
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
