<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { reqFigure, reqUserArticle } from "@/api";
import AnnounceVue from "./Announce.vue";
const router = useRouter();
const active = ref(0);
const params = reactive({
  page: 1,
  per_page: 10,
});
const figure = reactive({
  read_count: 0,
  fans_count: 0,
});
const article = reactive<Array<Object>>([]);
// 获取粉丝和用户作品的数据
const getFigure = async () => {
  const res = await reqFigure();
  if (res.status === 200) {
    figure.read_count = res.data.data.read_count;
    figure.fans_count = res.data.data.fans_count;
  } else {
    return Promise.reject("获取数据失败");
  }
};
// 获取用户作品
const getUserArticle = async () => {
  const res = await reqUserArticle(params);
  if (res.status === 200) {
    article.push(...res.data.data.results);
  } else {
    return Promise.reject("获取数据失败");
  }
};
// 在setup中获取数据
getFigure().catch(() => {
  console.log("获取数据失败");
});
getUserArticle().catch(() => {
  console.log("获取数据失败");
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
    <van-nav-bar title="我的动态" left-arrow @click-left="router.back()" />
  </VanConfigProvider>
  <van-tabs v-model:active="active" shrink>
    <van-tab title="作品">
      <van-empty v-if="article.length === 0" description="暂无数据"></van-empty>
      <van-list v-else></van-list>
    </van-tab>
    <van-tab title="公告">
      <AnnounceVue></AnnounceVue>
    </van-tab>
    <van-tab title="数据">
      <div class="figure">
        <div class="fans-count">
          <p @click="router.push('/follow/fans')">
            粉丝数
            <van-icon name="arrow" />
          </p>
          <p class="count">
            <span>{{ figure.fans_count }}</span>
            <span>人</span>
          </p>
        </div>
        <div class="read-count">
          <p>阅读数</p>
          <p class="count">
            <span>{{ figure.read_count }}</span>
            <span>次</span>
          </p>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">
.figure {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.3rem;
  div {
    width: 49%;
    background-color: #fff;
    height: 75px;
    border-radius: 10px;
    padding: 0.26667rem;
    p {
      padding-bottom: 0.26667rem;
      font-size: 0.4rem;
      &:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    span {
      &:first-child {
        font-size: 0.64rem;
        margin-right: 0.26667rem;
      }
      &:last-child {
        font-size: 0.32rem;
        color: #999;
      }
    }
  }
}
</style>
