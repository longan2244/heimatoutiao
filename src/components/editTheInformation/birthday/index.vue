<template>
  <div class="birthday-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('shutDown')"
      @confirm="onConfirm"
    ></van-datetime-picker>
  </div>
</template>

<script>
import { editprofileapi } from "@/api/user";
import { parsebirthdayTime } from "@/utils/dayjs";
export default {
  components: {},
  name: "birthday",
  props: ["value"],
  data() {
    return {
      newtimer: this.value.split("-"),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm(checkoutdate) {
      let dayjsparse = parsebirthdayTime(checkoutdate);
      await editprofileapi({
        birthday: dayjsparse,
      });
      this.$emit("shutDown");
      this.$emit("input", dayjsparse);
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
