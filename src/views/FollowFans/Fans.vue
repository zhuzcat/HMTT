<script setup lang="ts">
import { ref, reactive } from "vue";
import { Toast } from "vant";
import { reqFollower } from "@/api";
import UserListVue from "./components/UserList.vue";
const fansList = ref<Array<{ [propName: string]: any }>>([]);
const params = reactive({
  page: 1,
  per_page: 10,
});
const list = ref();
// 获取粉丝列表的方法
const getFansList = async () => {
  const result = await reqFollower(params);
  list.value.stopLoading();
  if (result.data.data.results.length === 0) {
    list.value.ListEnd();
  }
  if (result.status === 200) {
    fansList.value.push(...result.data.data.results);
  } else {
    return Promise.reject(result.data.message);
  }
};
// 关注的回调
const followUser = (id: any) => {
  const item = fansList.value.find((item) => item.id === id);
  if (item!.mutual_follow === undefined) {
    item!.mutual_follow = true;
  }
  item!.following = true;
};
// 取消关注的回调
const unFollowUser = (id: any) => {
  const item = fansList.value.find((item) => item.id === id);
  if (item!.mutual_follow === true) {
    item!.mutual_follow = undefined;
  }
  item!.following = false;
};
// list的load回调
const onLoad = () => {
  params.page++;
  getFansList().catch((err) => {});
};
// 获取粉丝列表
getFansList().catch((err) => {});
</script>

<template>
  <UserListVue
    ref="list"
    :list="fansList"
    @follow="followUser"
    @unfollow="unFollowUser"
    @load="onLoad"
  />
</template>

<style scoped></style>
