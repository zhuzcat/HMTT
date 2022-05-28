<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import ArticleItemVue from "@/components/ArticleItem.vue";
import { reqSearchResult } from "@/api";
const router = useRouter();
const route = useRoute();
// 返回的文章列表
const articles = ref<Array<{ [propName: string]: any }>>([]);
// 当前的页数
const page = ref(1);
// 控制列表的状态
const loading = ref(false);
const finished = ref(false);
// 关键词
const q = route.params.keyword;

// 获取搜索结果的方法
const getSearchResult = async () => {
  const res = await reqSearchResult({
    page: page.value,
    per_page: 10,
    q,
  });
  // 判断是否加载完
  if (res.data.data.results.length === 0) {
    finished.value = true;
    loading.value = false;
    return;
  }
  if (res.status === 200) {
    articles.value.push(...res.data.data.results);
    loading.value = false;
  } else {
    return Promise.reject("获取搜索结果失败");
  }
};
// 到底部加载的方法
const onLoad = () => {
  page.value++;
  getSearchResult().catch((err) => {
    Toast.fail(err);
  });
};
// 获取初始的搜索结果
getSearchResult().catch((err) => {
  Toast(err);
});
</script>

<template>
  <div>
    <van-nav-bar
      fixed
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    <div class="list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItemVue
          v-for="(item, index) in articles"
          :key="item.art_id"
          :item="item"
          :crossShow="false"
        />
      </van-list>
    </div>
  </div>
</template>

<style scoped>
.list {
  padding-top: 46px;
}
</style>
