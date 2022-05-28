<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import CommentVue from "./Comment.vue";
import { reqAddComment } from "@/api";
const { id, articleDetail } = defineProps<{
  id: string;
  articleDetail: {
    [propName: string]: any;
  };
}>();
// 分享的标识
const showShare = ref(false);
const options = [
  [
    { name: "微信", icon: "wechat" },
    { name: "朋友圈", icon: "wechat-moments" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
    { name: "小程序码", icon: "weapp-qrcode" },
  ],
];
const emits = defineEmits(["like", "unlike", "collect", "uncollect", "comm"]);
// comment组建的ref
const comment = ref();
// 展示输入评论框
const showComment = ref(false);
// 评论的内容
const commentContent = ref("");
// 发送评论的方法
const sendComment = async () => {
  if (commentContent.value.trim().length === 0) {
    Toast("评论不能为空");
    return;
  }
  const data = {
    target: id,
    content: commentContent.value,
  };
  const res = await reqAddComment(data);
  if (res.status === 201) {
    commentContent.value = "";
    emits("comm");
    showComment.value = false;
    comment.value.addComment(res.data.data.new_obj);
    ToComment();
  } else {
    Toast("评论失败");
  }
};
// 点击到评论区
const ToComment = () => {
  document.querySelector(".comment-list")?.scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="comment-list">
    <div class="comment-header">
      <span class="com-count">全部评论（{{ articleDetail.comm_count }}）</span>
      <span class="like-it">赞 {{ articleDetail.like_count }}</span>
    </div>
    <!-- 评论列表 -->
    <CommentVue :show="true" :id="id" ref="comment" type="a" />
  </div>
  <!-- 底部导航 -->
  <div class="detail-footer">
    <!-- 评论框 -->
    <div class="input">
      <van-field
        @focus="showComment = true"
        style="
          background-color: #f7f8fa;
          height: 0.9rem;
          border-radius: 0.9rem;
          padding: 0.1rem 0.35rem;
        "
        placeholder="抢沙发..."
      ></van-field>
    </div>

    <!-- 点赞收藏等操作 -->
    <div class="tt-icon">
      <van-icon name="chat-o" @click="ToComment" />
      <span>评论</span>
    </div>
    <div class="tt-icon">
      <van-icon
        name="good-job-o"
        v-if="articleDetail.attitude !== 1"
        @click="emits('like', articleDetail.art_id)"
      />
      <van-icon
        name="good-job"
        color="#1989fa"
        v-else
        @click="emits('unlike', articleDetail.art_id)"
      />
      <span
        :style="{ color: articleDetail.attitude === 1 ? '#1989fa' : '#000' }"
        >{{ articleDetail.attitude === 1 ? "已点赞" : "点赞" }}</span
      >
    </div>
    <div class="tt-icon">
      <van-icon
        name="star-o"
        v-if="!articleDetail.is_collected"
        @click="emits('collect', articleDetail.art_id)"
      />
      <van-icon
        name="star"
        color="#1989fa"
        v-else
        @click="emits('uncollect', articleDetail.art_id)"
      />
      <span
        :style="{ color: articleDetail.is_collected ? '#1989fa' : '#000' }"
        >{{ articleDetail.is_collected ? "已收藏" : "收藏" }}</span
      >
    </div>
    <div class="tt-icon">
      <van-icon name="share-o" @click="showShare = true" />
      <span>分享</span>
    </div>
  </div>
  <!-- 展开评论框 -->
  <van-popup
    v-model:show="showComment"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <van-nav-bar title="评论" left-arrow @click-left="showComment = false">
      <template #right>
        <span style="color: #1989fa" @click="sendComment">发表</span>
      </template>
    </van-nav-bar>
    <van-field
      v-model="commentContent"
      :autosize="{ minHeight: 300 }"
      type="textarea"
      placeholder="请输入评论..."
    />
  </van-popup>
  <!-- 展开分享 -->
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
  />
</template>

<style scoped lang="less">
.comment-list {
  padding-bottom: 1.5rem;
  margin-top: 15px;
  background-color: #fff;
  .comment-header {
    padding: 18px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    .com-count {
      color: #000;
      font-size: 14px;
    }
    .like-it {
      color: #999;
      font-size: 12px;
    }
  }
}
.tt-icon {
  text-align: center;
  font-size: 0.53333rem;
  margin: 0 0.07rem;
  display: inline-block;
  position: relative;
}

.tt-icon span {
  width: 40px;
  font-size: 0.26667rem;
  display: block;
}

.detail-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #fff;
}

.detail-footer .input {
  padding: 5px 5px 5px 10px;
}
</style>
