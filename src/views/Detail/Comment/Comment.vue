<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import { reqArticleComment, reqLikeComment, reqUnLikeComment } from "@/api";
import { useThrottleFn } from "@vueuse/core";
import { timeAgo } from "@/utils/date";
import ReplyVue from "./Reply.vue";
const { show, id, type } = defineProps<{
  show: boolean;
  id: string;
  type: string;
}>();
// 展示回复的popup
const showReply = ref<boolean>(false);
// 回复的评论
const replyComment = ref<{ [propName: string]: any }>({});
// 加载的标识
const loading = ref(false);
// offset的初始值
const reqId = ref(null);
// isFinished的初始值
const isFinished = ref(false);
// 存储评论列表
const commentList = ref<{ [propName: string]: any }[]>([]);
// 展示reply的方法
const replyShow = (item: {}) => {
  showReply.value = true;
  replyComment.value = item;
};
// 获取文章评论列表的方法
const getCommentList = async () => {
  const params = {
    type,
    offset: reqId.value,
    source: id,
    limit: 10,
  };
  const res = await reqArticleComment(params);
  reqId.value = res.data.data.last_id;
  if (res.data.data.end_id === null) {
    loading.value = false;
    isFinished.value = true;
    return;
  }
  if (res.status === 200) {
    loading.value = false;
    commentList.value.push(...res.data.data.results);
  } else {
    return Promise.reject("请求失败");
  }
};
// 点赞评论的方法
const likeComment = async (commentId: number) => {
  const res = await reqLikeComment(commentId);
  if (res.status === 201) {
    const index = commentList.value.findIndex(
      (item) => item.com_id === commentId
    );
    commentList.value[index].is_liking = true;
    commentList.value[index].like_count += 1;
    Toast.success("点赞成功");
  } else {
    Toast("点赞失败");
  }
};
// 取消点赞评论的方法
const unLikeComment = async (commentId: number) => {
  const res = await reqUnLikeComment(commentId);
  if (res.status === 204) {
    const index = commentList.value.findIndex(
      (item) => item.com_id === commentId
    );
    commentList.value[index].is_liking = false;
    commentList.value[index].like_count -= 1;
    Toast.success("取消点赞");
  } else {
    Toast("取消点赞失败");
  }
};
// 添加到评论列表
const addComment = (comment: { [propName: string]: any }) => {
  commentList.value.unshift(comment);
};
// 获取评论列表
getCommentList().catch(() => {
  console.log("获取评论列表失败");
});
// 加载的方法
const onLoad = useThrottleFn(() => {
  getCommentList();
}, 500);
// 暴露给父组件的方法
defineExpose({
  addComment,
});
</script>

<template>
  <van-empty v-if="commentList.length == 0" description="暂时没有评论" />
  <van-list
    v-else
    offset="50"
    :immediate-check="false"
    v-model:loading="loading"
    :finished="isFinished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="item" v-for="(item, index) in commentList" :key="item.com_id">
      <van-image
        width="0.9rem"
        height="0.9rem"
        round
        :src="item.aut_photo"
        fit="cover"
      />
      <div class="info">
        <p class="author">
          <span class="name">{{ item.aut_name }} </span>
          <span class="zan">
            <van-icon
              v-if="!item.is_liking"
              name="like-o"
              size="0.26667rem"
              @click="likeComment(item.com_id)"
            />
            <van-icon
              v-else
              name="like"
              size="0.26667rem"
              color="red"
              @click="unLikeComment(item.com_id)"
            />
            <span class="count">{{ item.like_count }}</span>
          </span>
        </p>
        <p class="content">
          {{ item.content }}
        </p>
        <p>
          <span class="reply" @click="replyShow(item)" v-if="show">
            {{ item.reply_count === 0 ? "" : item.reply_count + " " }} 回复
            <van-icon name="arrow" />
          </span>
          <span class="time">{{ timeAgo(item.pubdate) }}</span>
        </p>
      </div>
    </div>
  </van-list>
  <van-popup
    v-model:show="showReply"
    position="top"
    :style="{ height: '100%' }"
  >
    <ReplyVue
      :comment="replyComment"
      @close="showReply = false"
      :art_id="id"
      @addComm="replyComment.reply_count++"
      @like="likeComment"
      @unlike="unLikeComment"
      @follow="replyComment.is_followed = true"
    />
  </van-popup>
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
      .reply {
        margin-right: 0.26667rem;
        width: 1.6rem;
        height: 0.66667rem;
        background: #f7f8fa;
        border-radius: 0.32rem;
        display: inline-block;
        line-height: 0.66667rem;
        text-align: center;
        font-size: 0.32rem;
      }
      .time {
        color: #999;
        font-size: 0.32rem;
      }
    }
    .author {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 0.4rem;
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
    .content {
      color: #666;
      font-size: 0.42667rem;
      word-break: break-all;
    }
  }
}
</style>
