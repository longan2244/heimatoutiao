<template>
  <div class="articleinfo-container">
    <!-- 文章头部 -->
    <div class="article-head">
      <van-nav-bar
        title="文章详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="article-in">
      <!-- 文章内容 -->
      <div class="articlemain">
        <!-- 文章标题 -->
        <h1 class="title">{{ articledata.title }}</h1>
        <!-- 用户banner -->
        <van-cell center :title="articledata.aut_name" :label="timer">
          <template #icon>
            <div class="accountPicturebox">
              <van-image
                class="accountPicture"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
          </template>
          <template>
            <div
              class="concern"
              @click="
                articledata.is_followed
                  ? delfollowing(articledata.aut_id)
                  : following(articledata.aut_id)
              "
            >
              {{ articledata.is_followed ? "已关注" : "关注" }}
            </div>
          </template>
        </van-cell>
        <div
          class="articlebody"
          ref="articlebody"
          v-html="articledata.content"
        ></div>
        <div class="commentss">
          <Comments @postshow="postokthen" :source="article_id"></Comments>
        </div>
      </div>
    </div>
    <!-- 底部交互组件 -->
    <div class="bottomInteraction">
      <van-cell icon="shop-o" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-button
            @click="show = true"
            class="comments"
            hairline
            round
            type="info"
            >评论
            <!-- 评论 -->
            <van-icon name="chat-o" :badge="articledata.comm_count"
          /></van-button>
        </template>
        <template #title>
          <div class="dzplfx">
            <!-- 收藏 -->
            <van-icon
              @click="
                articledata.is_collected
                  ? delcollections(articledata.art_id)
                  : collections(articledata.art_id)
              "
              :name="articledata.is_collected ? 'star' : 'star-o'"
            />
            <!-- 点赞 -->
            <van-icon
              @click="
                articledata.attitude == -1
                  ? forbidClick(articledata.art_id)
                  : delforbidClick(articledata.art_id)
              "
              :name="
                articledata.attitude == -1
                  ? 'good-job-o'
                  : articledata.attitude == 1
                  ? 'good-job'
                  : 'circle'
              "
            />
            <!-- 分享 -->
            <van-icon name="guide-o" />
          </div>
        </template>
      </van-cell>
    </div>
    <!-- 一级评论 -->
    <van-popup get-container="body" v-model="show" position="bottom">
      <Postcomponent :article_id="article_id"></Postcomponent>
    </van-popup>
    <!-- level2评论 -->
    <van-popup :style="{ height: '70%' }"  get-container="body" v-model="leveltwoshown" position="bottom">
      <Level2com   :art_id="article_id" v-if="leveltwoshown" :item="item"></Level2com>
    </van-popup>
  </div>
</template>

<script>
import Comments from "@/components/comments/index.vue";
import Postcomponent from "@/components/comments/postcomponent/index.vue";
import { articleapi } from "@/api/essay";
import { parseTime } from "@/utils/dayjs";
import { ImagePreview } from "vant";
import Level2com from "@/components/comments/level2com";
import { followingapi, delfollowingapi } from "@/api/user";
import evtbus from "@/utils/evtbus";
import {
  collectionsapi,
  delcollectionsapi,
  delforbidClickapi,
  forbidClickapi,
} from "@/api/essay";
export default {
  components: { Comments, Postcomponent, Level2com },
  name: "Articleinfo",
  props: ["article_id"],
  data() {
    return {
      articledata: {},
      show: false, //评论弹出层
      leveltwoshown: false, //二级评论弹出层
      item: [], //当点击一级评论回复时发送的item数据
    };
  },
  methods: {
    // 获取文章
    async getarticle() {
      try {
        let { data: res } = await articleapi(this.article_id);
        this.articledata = res.data;
        // 文章获取过后吧img存入数组
        this.$nextTick(() => {
          this.finishPreviewsImg();
        });
      } catch (error) {}
    },
    //关注
    async following(target) {
      try {
        await followingapi(target);
        this.articledata.is_followed = true;
      } catch (error) {}
    },
    //取消关注
    async delfollowing(target) {
      try {
        await delfollowingapi(target);
        this.articledata.is_followed = false;
      } catch (error) {
        console.log(error);
      }
    },
    //收藏
    async collections(target) {
      try {
        await collectionsapi(target);
        this.articledata.is_collected = true;
        console.log("收藏");
        this.$toast.success("收藏成功");
      } catch (error) {}
    },
    //取消收藏
    async delcollections(target) {
      try {
        await delcollectionsapi(target);
        this.articledata.is_collected = false;
        this.$toast.fail("取消收藏");
        console.log("取消收藏");
      } catch (error) {}
    },
    //点赞
    async forbidClick(target) {
      console.log("点赞");
      await forbidClickapi(target);
      this.articledata.attitude = 1;
    },
    async delforbidClick(target) {
      console.log("取消点赞");
      await delforbidClickapi(target);
      this.articledata.attitude = -1;
    },
    // 处理预览图片
    finishPreviewsImg() {
      let imgarr = [];
      this.$refs.articlebody
        .querySelectorAll("img")
        .forEach((element, index) => {
          imgarr.push(element.src);
          element.onclick = function () {
            ImagePreview({
              images: imgarr, //所有的图片数组
              startPosition: index, //当前缩影
            });
          };
        });
    },
    //发布一级评论OK事件
    postokthen() {
      this.show = false; //关闭底部弹出层
      this.articledata.comm_count += 1; //评论显示+1
    },
  },
  computed: {
    timer() {
      return parseTime(this.articledata.pubdate);
    },
  },
  watch: {},
  created() {
    this.getarticle();
  },
  mounted() {
    //二级
    evtbus.$on("show_level2pop", (item) => {
      this.leveltwoshown = true;
      this.item = item;
    });
  },
};
</script>

<style lang='less' scpoed>
.articleinfo-container {
  background: white;
  .article-in {
    padding: 24px 15px 50px 15px;
    .articlemain {
      // 文章头部
      .title {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 33px;
        letter-spacing: 1px;
        color: #3a3a3a;
      }
      .accountPicturebox {
        border-radius: 40px;
        height: 40px;
        width: 40px;
        margin-right: 5px;
        overflow: hidden;
        .accountPicture {
          width: 100%;
          height: 100%;
        }
      }
      .van-cell__value {
        display: flex;
        justify-content: end;
      }
      .concern {
        width: 85px;
        height: 29px;
        line-height: 29px;
        background-color: #3296fa;
        border-radius: 15px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
        text-align: center;
      }
      // 文章body
      .articlebody {
        padding-top: 30px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 1px;
        color: #222222;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
  // 底部文章交互
  .bottomInteraction {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .van-cell {
      height: 50px;
    }
    .comments {
      width: 200px;
      background-color: #ffffff;
      border: solid 1px #eeeeee;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 33px;
      letter-spacing: 1px;
      color: #a7a7a7;
    }
    .van-cell__title {
      height: 100%;
    }
    .dzplfx {
      display: flex;
      height: 50px;
      .van-icon {
        flex: 1;
        display: flex;
        justify-content: center;
        line-height: 35px;
        font-size: 21px;
      }
      .van-icon-star {
        color: lightsalmon;
      }
      .van-icon-good-job {
        color: red;
      }
    }
  }
  .textareabox {
  }
}
</style>
