<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import NotifyListVue from "./NotifyList.vue";
const active = ref(0);
const tabsList = [
  {
    title: "全部",
    id: 0,
  },
  {
    title: "系统通知",
    id: 1,
  },
  {
    title: "评论",
    id: 2,
  },
  {
    title: "粉丝",
    id: 3,
  },
  {
    title: "点赞",
    id: 4,
  },
];
const router = useRouter();
</script>

<template>
  <VanConfigProvider
    :theme-vars="{
      navBarBackgroundColor: '#fff',
      navBarIconColor: '#000',
      navBarTitleTextColor: '#000',
    }"
  >
    <van-nav-bar title="消息通知" left-arrow @click-left="router.back()" />
  </VanConfigProvider>
  <van-tabs v-model:active="active" shrink>
    <van-tab v-for="(tab, index) in tabsList" :title="tab.title" :name="tab.id">
      <NotifyListVue :type="tab.id" />
    </van-tab>
  </van-tabs>
</template>

<style scoped></style>
