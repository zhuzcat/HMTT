<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThrottleFn } from "@vueuse/core";
import { Toast } from "vant";
import { useUserStore } from "@/store";
import {
  reqArticleDetail,
  reqFollowUser,
  reqUnFollowUser,
  reqLikeArticle,
  reqUnLikeArticle,
  reqCollectArticle,
  reqUnCollectArticle,
} from "@/api";
import CommentListVue from "./Comment/CommentList.vue";
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const { id } = route.params;
provide("id", id);
// 存储文章详情的数据
const articleDetail = ref<{ [propName: string]: any }>({});
// author元素
const author = ref<HTMLDivElement>();
// 控制nav上的作者是否显示
const showAuthor = ref<boolean>(false);
// 关注用户的方法
const followUser = async (userId: string) => {
  const res = await reqFollowUser(userId);
  if (res.status === 201) {
    articleDetail.value.is_followed = true;
    user.getUserInfo();
  } else {
    Toast("关注失败");
  }
};
// 取消关注用户的方法
const unFollowUser = async (userId: string) => {
  const res = await reqUnFollowUser(userId);
  if (res.status === 204) {
    articleDetail.value.is_followed = false;
    user.getUserInfo();
  } else {
    Toast("取消关注失败");
  }
};
// 点赞文章的方法
const likeArticle = async (articleId: number) => {
  const res = await reqLikeArticle(articleId);
  if (res.status === 201) {
    articleDetail.value.attitude = 1;
    Toast.success("点赞成功");
  } else {
    Toast("点赞失败");
  }
};
// 取消点赞文章的方法
const unLikeArticle = async (articleId: number) => {
  const res = await reqUnLikeArticle(articleId);
  if (res.status === 204) {
    articleDetail.value.attitude = -1;
    Toast.success("取消点赞");
  } else {
    Toast("取消点赞失败");
  }
};
// 收藏文章的方法
const collectArticle = async (articleId: number) => {
  const res = await reqCollectArticle(articleId);
  if (res.status === 201) {
    articleDetail.value.is_collected = true;
    Toast.success("收藏成功");
  } else {
    Toast("收藏失败");
  }
};
// 取消收藏文章的方法
const unCollectArticle = async (articleId: number) => {
  const res = await reqUnCollectArticle(articleId);
  if (res.status === 204) {
    articleDetail.value.is_collected = false;
    Toast.success("取消收藏");
  } else {
    Toast("取消收藏失败");
  }
};
// 获取文章详情的方法
const getArticleDetail = async () => {
  const result = await reqArticleDetail(id as string);
  if (result.status === 200) {
    articleDetail.value = result.data.data;
  } else {
    return Promise.reject(result.data.message);
  }
};
// 为滚轮事件添加防抖
const scrollHandle = useThrottleFn(() => {
  const { bottom } = author.value!.getBoundingClientRect();
  if (bottom - 44 < 0) {
    showAuthor.value = true;
  } else {
    showAuthor.value = false;
  }
}, 100);
// 获取文章详情
getArticleDetail().catch((err) => {
  console.log(err);
});
onMounted(() => {
  document.addEventListener("scroll", scrollHandle);
});
// 组件卸载时移除滚轮事件
onBeforeUnmount(() => {
  document.removeEventListener("scroll", scrollHandle);
});
</script>

<template>
  <!-- nav导航处 -->
  <VanConfigProvider
    :theme-vars="{
      navBarBackgroundColor: '#fff',
      navBarIconColor: '#000',
      navBarTitleTextColor: '#000',
    }"
  >
    <van-nav-bar left-arrow fixed @click-left="router.back()" ref="nav">
      <template #right>
        <van-icon name="ellipsis" size="0.48rem" />
      </template>
      <template #title>
        <!-- 用于展示用户信息 -->
        <div class="nav-author" v-show="showAuthor">
          <van-image
            round
            fit="cover"
            width="0.6rem"
            height="0.6rem"
            :src="articleDetail.aut_photo"
            alt=""
          />
          <div class="author-name">
            <p>{{ articleDetail.aut_name }}</p>
          </div>

          <div class="follow">
            <p
              style="color: #1989fa"
              @click="followUser(articleDetail.aut_id)"
              v-if="!articleDetail.is_followed"
            >
              关注
            </p>
            <p style="color: #ccc" v-else>已关注</p>
          </div>
        </div>
      </template>
    </van-nav-bar>
    <div class="detail">
      <!-- 题目 -->
      <h3 class="title">{{ articleDetail.title }}</h3>
      <!-- 数据 -->
      <p class="num">
        <span>{{ articleDetail.pubdate }}</span>
        <span>{{ articleDetail.read_count }} 阅读</span>
        <span>{{ articleDetail.comm_count }} 评论</span>
      </p>
      <!-- 作者 -->
      <div class="author" ref="author">
        <van-image
          round
          fit="cover"
          width="0.9rem"
          height="0.9rem"
          :src="articleDetail.aut_photo"
          alt=""
        />
        <p class="name">{{ articleDetail.aut_name }}</p>
        <van-button
          v-if="!articleDetail.is_followed"
          round
          size="small"
          type="primary"
          style="padding: 0 0.35rem"
          @click="followUser(articleDetail.aut_id)"
          >+ 关注</van-button
        >
        <van-button
          v-else
          round
          size="small"
          style="padding: 0 0.35rem"
          @click="unFollowUser(articleDetail.aut_id)"
          >取消关注</van-button
        >
      </div>
      <!-- 主要内容 -->
      <div class="content" v-html="articleDetail.content" v-highlight></div>
    </div>
    <!-- 评论组件 -->
    <CommentListVue
      :id="(id as string)"
      :articleDetail="articleDetail"
      @comm="articleDetail.comm_count++"
      @like="likeArticle"
      @unlike="unLikeArticle"
      @collect="collectArticle"
      @uncollect="unCollectArticle"
    />
  </VanConfigProvider>
</template>

<style scoped lang="less">
.nav-author {
  display: flex;
  align-items: center;
  .author-name {
    margin-left: 10px;
    color: #000;
    font-size: 14px;
  }
  .follow {
    padding-left: 15px;
    color: #000;
    font-size: 12px;
  }
}
.detail {
  padding: 1.45rem 15px 1.15rem;
  background-color: #fff;
}

.detail .title {
  font-size: 0.58667rem;
  line-height: 0.8rem;
  font-weight: 400;
  word-break: break-all;
}

.detail .num {
  padding-top: 0.32rem;
  color: #a5a6ab;
  display: flex;
  font-size: 0.26667rem;
}

.detail .num span {
  height: 0.26667rem;
  line-height: 0.26667rem;
}

.detail .num span ~ span {
  border-left: 0.02667rem solid #bfc2cb;
  margin-left: 0.13333rem;
  padding-left: 0.13333rem;
}

.detail .author {
  display: flex;
  align-items: center;
  padding-top: 0.64rem;
  margin-bottom: 25px;
}

.detail .author .name {
  flex: 1;
  padding: 0 0.26667rem;
  font-size: 0.42667rem;
}

.detail .content {
  padding-top: 25px;
  border-top: 0.5px solid #f7f8fa;
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  word-break: break-all;
  :deep(img) {
    width: 100%;
  }
  :deep(pre) {
    overflow: auto;
    margin: 10px 0;
  }
  :deep(table) {
    width: 100% !important;
    overflow: auto;
  }
}
</style>
