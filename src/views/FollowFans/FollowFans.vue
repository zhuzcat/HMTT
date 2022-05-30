<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import FollowingVue from "./Following.vue";
import FansVue from "./Fans.vue";
const router = useRouter();
const route = useRoute();
const activeName = ref(route.params.type);
</script>

<template>
  <VanConfigProvider
    :theme-vars="{
      navBarBackgroundColor: '#fff',
      navBarIconColor: '#000',
      navBarTitleTextColor: '#000',
    }"
  >
    <van-nav-bar title="关注/粉丝" left-arrow @click-left="router.back()" />
  </VanConfigProvider>
  <van-tabs v-model:active="(activeName as string)" animated>
    <van-tab title="关注" name="following">
      <FollowingVue />
    </van-tab>
    <van-tab title="粉丝" name="fans">
      <FansVue />
    </van-tab>
  </van-tabs>
</template>

<style scoped></style>
