<script setup lang="ts">
import { reactive, ref } from "vue";
import { Toast } from "vant";
import UserListVue from "./components/UserList.vue";
import { reqFollowing } from "@/api";
const params = reactive({
  page: 1,
  per_page: 10,
});
const followingList = ref<Array<{ [propName: string]: any }>>([]);
const list = ref();
// 获取关注的列表的方法
const getFollowingList = async () => {
  console.log(list.value);

  list.value.stopLoading();
  const result = await reqFollowing(params);
  if (result.data.data.results.length === 0) {
    list.value.ListEnd();
  }
  if (result.status === 200) {
    followingList.value.push(...result.data.data.results);
    followingList.value.forEach((item) => {
      item.following = true;
    });
  } else {
    return Promise.reject(result.data.message);
  }
};
// 关注的回调
const followUser = (id: any) => {
  const item = followingList.value.find((item) => item.id === id);
  if (item!.mutual_follow === undefined) {
    item!.mutual_follow = true;
  }
  item!.following = true;
};
// 取消关注的回调
const unFollowUser = (id: any) => {
  const item = followingList.value.find((item) => item.id === id);
  if (item!.mutual_follow === true) {
    item!.mutual_follow = undefined;
  }
  item!.following = false;
};
// list的load回调
const onLoad = () => {
  params.page++;
  getFollowingList().catch((err) => {});
};
// 发送请求获取列表
getFollowingList().catch((err) => {});
</script>

<template>
  <UserListVue
    ref="list"
    :list="followingList"
    @follow="followUser"
    @unfollow="unFollowUser"
    @load="onLoad"
  />
</template>

<style scoped></style>
