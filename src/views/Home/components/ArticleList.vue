<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import ArticleItemVue from "./ArticleItem.vue";
import { reqArticleList, reqUnLike, reqReport } from "@/api";
// 底部加载的loading的状态
const loading = ref(false);
// 顶部刷新的loading的状态
const isLoading = ref(false);
// 存储timestamp的状态
const timestamp = ref(Date.now());
// 存储列表是否完成的状态
const finished = ref(false);
// 获取channel_id
const props = defineProps<{ cid: any }>();
// 定义列表
const articleList = ref<
  Array<{
    [propName: string]: any;
  }>
>([]);
// 获取文章列表的方法
async function getArticleList(channel_id: string, isRefresh = false) {
  // 请求文章列表
  const result = await reqArticleList({
    channel_id,
    timestamp: timestamp.value,
  });
  // 判断请求是否成功
  if (result.status === 200) {
    // 更新列表
    isRefresh
      ? (articleList.value = result.data.data.results)
      : articleList.value.push(...result.data.data.results);
    // 存储timestamp
    timestamp.value = parseInt(result.data.data.pre_timestamp);
    // 将底部加载的loading状态设置为false
    loading.value = false;
    // 将顶部加载的isLoading状态设置为false
    isLoading.value = false;
    if (result.data.data.pre_timestamp === null) {
      // 本次回来的数据是最后, 没有下一段数据了
      finished.value = true;
      return;
    }
  } else {
    return Promise.reject(result.data.message);
  }
}
// 在拉到列表底部的时候重新获取文章列表
function onLoad() {
  // 获取列表
  getArticleList(props.cid).catch((err) => {
    Toast(err);
  });
}
// 上拉刷新的回调
function onRefresh() {
  // 获取列表
  getArticleList(props.cid, true).catch((err) => {
    Toast(err);
  });
}
// 穿给子组件不感兴趣的回调
async function UnLike(id: string) {
  try {
    const result = await reqUnLike({ target: id });
    if (result.status === 201) {
      Toast.success("不感兴趣成功");
      const { target } = result.data.data;
      // 删除不感兴趣的文章
      articleList.value = articleList.value.filter(
        (item) => item.art_id !== target
      );
    } else {
      Toast("不感兴趣失败");
    }
  } catch {
    Toast("不感兴趣失败");
  }
}
// 举报的回调
async function reportArticle(target: string, type: string) {
  try {
    const result = await reqReport({ target, type });
    if (result.status === 201) {
      Toast.success("举报成功");
    } else {
      Toast("举报失败");
    }
  } catch {
    Toast("举报失败");
  }
}
// 获取列表
getArticleList(props.cid).catch(() => {
  // 如果获取失败，则提醒获取失败
  Toast("获取文章列表失败");
});
</script>

<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      @load="onLoad"
      :immediate-check="false"
      :finished="finished"
      :offset="50"
      finished-text="没有更多了"
    >
      <ArticleItemVue
        v-for="(item, index) in articleList"
        :key="item.art_id"
        :item="item"
        @unlike="UnLike"
        @report="reportArticle"
      />
    </van-list>
  </van-pull-refresh>
</template>

<style scoped></style>
