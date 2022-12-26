<template>
  <div class="gender-container">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('shutDown')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editprofileapi } from "@/api/user";
export default {
  components: {},
  name: "",
  props: ["value"],
  data() {
    return {
      columns: ["女", "男"],
    };
  },
  methods: {
    async onConfirm(value, index) {
      console.log(index);
      //  修改性别
      await editprofileapi({
        gender: index,
      });
      this.$emit("shutDown");
      this.$emit("input", index);
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
