<script setup lang="ts">
import { ref, reactive } from "vue";
import { reqAnnouncement } from "@/api";
const params = reactive({
  page: 1,
  per_page: 10,
});
const loading = ref(false);
const finished = ref(false);
const announcement = ref<Array<{ [propName: string]: any }>>([]);
// 获取公告的方法
const getAnnouncement = async () => {
  const res = await reqAnnouncement(params);
  if (res.status === 200) {
    announcement.value.push(...res.data.data.results);
    if (res.data.data.total_count !== 10) {
      finished.value = true;
    }
  } else {
    return Promise.reject("获取数据失败");
  }
};
// 在setup中获取数据
getAnnouncement().catch(() => {
  console.log("获取数据失败");
});
</script>

<template>
  <van-list
    v-model:loading="loading"
    :finished="true"
    finished-text="没有更多了"
  >
    <van-cell
      v-for="item in announcement"
      :key="item.id"
      :title="item.title"
      :label="item.pubdate"
    />
  </van-list>
</template>

<style scoped></style>
