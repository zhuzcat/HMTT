<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { reqUserArticle } from "@/api";
import ArticleItemVue from "./ArticleItem.vue";
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const myArticle = reactive<Array<{ [propName: string]: any }>>([]);
const params = reactive({
  page: 1,
  per_page: 10,
});
// 列表的load回调
const onLoad = () => {
  params.page++;
  // 再次获取
  getMyArticle().catch((err) => {
    console.log(err);
  });
};
// 获取收藏列表的方法
const getMyArticle = async () => {
  loading.value = false;
  const res = await reqUserArticle(params);
  if (res.data.data.results.length !== 10) {
    finished.value = true;
  }
  if (res.status === 200) {
    myArticle.push(...res.data.data.results);
  } else {
    return Promise.reject("获取数据失败");
  }
};
// 在setup中获取收藏列表
getMyArticle().catch((err) => {
  console.log(err);
});
</script>

<template>
  <VanConfigProvider
    :theme-vars="{
      navBarBackgroundColor: '#fff',
      navBarIconColor: '#000',
      navBarTitleTextColor: '#000',
    }"
  >
    <van-nav-bar title="我的收藏" left-arrow @click-left="router.back()" />
  </VanConfigProvider>
  <van-empty v-if="myArticle.length === 0" description="暂无数据"></van-empty>
  <van-list
    v-else
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ArticleItemVue v-for="item in myArticle" :item="item" />
  </van-list>
</template>

<style scoped></style>
