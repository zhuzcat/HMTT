<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import { useUserStore } from "@/store";
import { reqAddComment, reqFollowUser } from "@/api";
import CommentVue from "./Comment.vue";
import { timeAgo } from "@/utils/date";
const user = useUserStore();
const emits = defineEmits(["close", "addComm", "like", "unlike", "follow"]);
const { comment, art_id } = defineProps<{
  comment: { [propName: string]: any };
  art_id: string;
}>();
const comm = ref();
// 回复评论的展示状态
const reply = ref(false);
// 回复评论的内容
const replyContent = ref("");
// 关注用户
const followUser = async () => {
  const res = await reqFollowUser(comment.aut_id);
  if (res.status === 201) {
    Toast("关注成功");
    emits("follow");
    user.getUserInfo();
  } else {
    Toast(res.data.data.message);
  }
};
// 回复评论
const replyComment = async () => {
  if (replyContent.value.trim().length === 0) {
    Toast("回复不能为空");
    return;
  }
  const data = {
    target: comment.com_id,
    content: replyContent.value,
    art_id,
  };
  const res = await reqAddComment(data);
  if (res.status === 201) {
    replyContent.value = "";
    reply.value = false;
    Toast.success("回复成功");
    emits("addComm");
    comm.value.addComment(res.data.data.new_obj);
  } else {
    Toast("回复失败");
  }
};
</script>
<template>
  <VanConfigProvider
    :theme-vars="{
      navBarBackgroundColor: '#fff',
      navBarIconColor: '#000',
      navBarTitleTextColor: '#000',
    }"
  >
    <van-nav-bar
      :title="comment.reply_count + '条回复'"
      left-arrow
      @click-left="emits('close')"
    />
  </VanConfigProvider>
  <div class="item">
    <van-image
      width="0.9rem"
      height="0.9rem"
      round
      :src="comment.aut_photo"
      fit="cover"
    />
    <div class="info">
      <p class="author">
        <span class="name">{{ comment.aut_name }} </span>
        <span
          v-if="!comment.is_followed"
          style="color: #1989fa"
          @click="followUser"
          >关注</span
        >
        <span v-else style="color: #ccc">已关注</span>
      </p>
      <p class="content">
        {{ comment.content }}
      </p>
      <p class="author">
        <span class="time">{{ timeAgo(comment.pubdate) }}</span>
        <span class="zan">
          <van-icon
            v-if="!comment.is_liking"
            name="like-o"
            size="0.26667rem"
            @click="emits('like', comment.com_id)"
          />
          <van-icon
            v-else
            name="like"
            size="0.26667rem"
            color="red"
            @click="emits('unlike', comment.com_id)"
          />
          <span class="count">{{ comment.like_count }}</span>
        </span>
      </p>
    </div>
  </div>
  <div class="comment-header">全部回复</div>
  <div style="margin-bottom: 1.5rem">
    <CommentVue
      :id="comment.com_id"
      :show="false"
      type="c"
      :key="comment.com_id"
      ref="comm"
    />
  </div>
  <!-- 底部 -->
  <div class="detail-footer">
    <van-cell style="padding: 0 0.2rem">
      <van-field
        v-if="!reply"
        @focus="reply = true"
        :rows="1"
        style="background-color: #f7f8fa; padding: 0.1rem 0.35rem"
        placeholder="抢沙发..."
      ></van-field>
      <van-field
        v-focus
        v-else
        v-model="replyContent"
        style="background-color: #f7f8fa; padding: 0.1rem 0.35rem"
        type="textarea"
      >
      </van-field>
    </van-cell>
    <van-button
      type="primary"
      size="small"
      style="flex: 20%"
      round
      @click="replyComment"
      >发表</van-button
    >
  </div>
</template>

<style scoped lang="less">
.item {
  display: flex;
  padding: 0.26667rem 0.42667rem;
  .info {
    flex: 1;
    padding-left: 0.26667rem;
    width: 100%;
    overflow: hidden;
    p {
      padding: 0.13333rem 0;
      margin: 0;
      span {
        font-size: 0.26667rem;
      }
      .time {
        color: #999;
        font-size: 0.32rem;
      }
      .zan {
        display: flex;
        align-items: center;
        .count {
          font-size: 0.26667rem;
          padding-left: 0.13333rem;
        }
      }
    }
    .author {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 0.4rem;
      }
    }
    .content {
      color: #666;
      font-size: 0.42667rem;
      word-break: break-all;
    }
  }
}
.comment-header {
  border-top: 1px solid #f5f5f5;
  color: #000;
  font-size: 0.4rem;
  padding: 0.4rem;
}

.detail-footer {
  position: fixed;
  width: 100%;
  border-top: 1px solid #f5f5f5;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  background-color: #fff;
  padding: 0.2rem;
}
</style>
