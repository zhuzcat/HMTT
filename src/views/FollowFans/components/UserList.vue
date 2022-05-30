<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import { reqFollowUser, reqUnFollowUser } from "@/api";
const { list } = defineProps<{ list: Array<{ [propName: string]: any }> }>();
const emits = defineEmits(["follow", "unfollow", "load"]);
const loading = ref(false);
const finished = ref(true);
const onLoad = () => {
  emits("load");
};
// 关注用户
const followUser = async (id: string) => {
  const res = await reqFollowUser(id);
  if (res.status === 201) {
    Toast.success("关注成功");
    emits("follow", id);
  } else {
    Toast(res.data.message);
  }
};
// 取消关注用户
const unFollowUser = async (id: string) => {
  const res = await reqUnFollowUser(id);
  if (res.status === 204) {
    Toast.success("取消关注成功");
    emits("unfollow", id);
  } else {
    Toast(res.data.message);
  }
};
// 停止加载
const stopLoading = () => {
  loading.value = false;
};
// 列表结束
const listEnd = () => {
  finished.value = true;
};
// 暴露给父组件
defineExpose({ stopLoading, listEnd });
</script>

<template>
  <van-empty description="暂无数据" v-if="list.length === 0" />
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    v-else
  >
    <div class="item" v-for="(item, index) in list" :key="item.id">
      <div class="user-item">
        <van-image
          round
          width="1.3rem"
          height="1.3rem"
          :src="item.photo"
          fit="cover"
        />
        <div class="info">
          <p>{{ item.name }}</p>
          <p>粉丝数：{{ item.fans_count }}</p>
        </div>
        <van-button
          round
          size="small"
          style="padding: 0 0.3rem"
          v-if="item.mutual_follow"
          @click="unFollowUser(item.id)"
          >互相关注</van-button
        >
        <van-button
          round
          size="small"
          style="padding: 0 0.3rem"
          v-else-if="item.following"
          @click="unFollowUser(item.id)"
          >取消关注</van-button
        >
        <van-button
          round
          type="primary"
          size="small"
          style="padding: 0 0.3rem"
          @click="followUser(item.id)"
          v-else
          >关注</van-button
        >
      </div>
    </div>
  </van-list>
</template>

<style scoped lang="less">
.item {
  padding: 0.2rem 0.5rem;
  background-color: #fff;
  .user-item {
    height: 2.08rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info {
      padding: 0 0.3rem;
      flex: 1;
      p:first-child {
        font-size: 0.42667rem;
      }
      p:last-child {
        color: #999;
        font-size: 0.36667rem;
      }
    }
  }
}
</style>
