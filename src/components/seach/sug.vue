<template>
  <div class="sug-container">
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item, index) in options"
        :key="index"
        @click="post(item.text)"
      >
        <template #title>
          <div class="search-value" v-html="item.html"></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 * 联想
 */
import { debounce } from "lodash"; //导入loadsh插件
import { sugapi } from "@/api/essay";
export default {
  components: {},
  name: "sug",
  props: ["seachtext"],
  data() {
    return {
      options: [], //联想数组
    };
  },
  methods: {
    async goseach() {
      try {
        let { data: res } = await sugapi(this.seachtext);
        if (!res.data.options.length) {
          return this.$toast("未查询到关键词");
        }
        //替换彩色
        res.data.options.forEach((element) => {
          this.options.push({
            html:
            element.replace(
              new RegExp(this.seachtext, "gi"),
              `<span style="color:red">${this.seachtext}</span>`
            ),
            text:element
          });
        });
      } catch (error) {
        this.options = [];
      }
    },
    post(item) {
      this.$emit("onSearch", item);
    },
  },
  computed: {},
  watch: {
    seachtext: {
      immediate: true,
      // 防抖优化
      handler: debounce(function () {
        this.goseach();
      }, 500),
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
</style>
