<script setup lang="ts">
import { ref } from "vue";
const active = ref(0);
</script>

<template>
  <!-- 二级路由区域 -->
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
  <!-- 底部导航区域 -->
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
