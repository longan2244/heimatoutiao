<template>
  <div class="comitem-container">
    <van-cell center>
      <template #icon>
        <div>
          <van-image
            class="userav"
            round
            width="36px"
            height="36px"
            :src="item.aut_photo"
          />
        </div>
      </template>
      <template #title>
        <div>{{ item.aut_name }}</div>
      </template>
      <template #label>
        <div>
          <!-- 评论内容 -->
          <p>{{ item.content }}</p>
          <div class="timer-comcom">
            <span class="timer">{{ timer }}</span>
            <span class="comcom"
              ><van-button type="primary" size="mini" @click="goreply"
                >{{ item.reply_count }}回复</van-button
              ></span
            >
          </div>
        </div>
      </template>
      <template #right-icon>
        <!-- 点赞区域 -->
        <div
          class="like"
          @click="
            item.is_liking
              ? delcommentlike(item.com_id)
              : commentlike(item.com_id)
          "
        >
          <van-icon :name="item.is_liking ? 'good-job' : 'good-job-o'" />
          {{ item.like_count }}
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { parseTime } from "@/utils/dayjs";
import { commentlikeapi, delcollectionsapi } from "@/api/essay.js";
import evtbus from "@/utils/evtbus";
export default {
  components: {},
  name: "comitem",
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    // 评论点赞
    async commentlike(target) {
      console.log(target, "点赞");
      await commentlikeapi(target);
      this.item.is_liking = true;
      this.item.like_count += 1;
    },
    // 取消评论点赞
    async delcommentlike(target) {
      console.log(target, "取消点赞");
      await delcollectionsapi(target);
      this.item.is_liking = false;
      this.item.like_count -= 1;
    },
    //点击去回复 开启弹出层
    goreply() {
      evtbus.$emit("show_level2pop",this.item);
    },
  },
  computed: {
    timer() {
      return parseTime(this.item.pubdate);
    },
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scpoed>
.comitem-container {
  .userav {
    margin-right: 10px;
  }
  .like {
    margin-left: 10px;
  }
  p {
    color: black;
  }
  .timer-comcom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
