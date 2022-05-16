<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Toast } from "vant";
import { reqUserChannels } from "@/api";
const active = ref(0);
// 定义频道列表
const userChannels = ref<{ channels?: Array<{ id?: string; name?: string }> }>({
  channels: [],
});
// 获取用户频道
async function getUserChannels() {
  const result = await reqUserChannels();
  console.log(result);

  // 判断请求是否成功
  if (result.status === 200) {
    userChannels.value = result.data.data;
  } else {
    return Promise.reject(result.data.message);
  }
}
// 组件挂载时获取用户频道数据
onMounted(() => {
  getUserChannels().catch(() => {
    // 如果获取失败，则提醒获取失败
    Toast("获取频道列表失败");
  });
});
</script>

<template>
  <!-- 顶部 -->
  <van-nav-bar fixed>
    <template #left>
      <img src="@/assets/logo.png" alt="" class="logo" />
    </template>
    <template #right>
      <van-icon name="search" size="0.48rem" color="#fff" />
    </template>
  </van-nav-bar>
  <!-- tab栏 -->
  <div class="channel-tab">
    <van-tabs v-model:active="active" sticky offset-top="1.226667rem" animated>
      <van-tab
        :title="channel.name"
        v-for="(channel, index) in userChannels.channels"
        :key="channel.id"
        >{{ channel.name }}的内容</van-tab
      >
    </van-tabs>
  </div>
</template>
<style scoped>
.logo {
  width: 100px;
  height: 30px;
}

.channel-tab {
  padding-top: 1.226667rem;
}
</style>
