<script setup lang="ts">
import { ref, computed } from "vue";
import { Toast } from "vant";
import {
  reqUserChannels,
  reqAllChanels,
  reqAddUserChannel,
  reqDeleteUserChannel,
} from "@/api";
import ArticleListVue from "./components/ArticleList.vue";
import ChannelEditVue from "./components/ChannelEdit.vue";
const activeName = ref(0);
const editShow = ref(false);
const allChannels = ref<Array<{ id?: string }>>([]);
// 定义频道列表
const userChannels = ref<{ channels: Array<{ id?: string; name?: string }> }>({
  channels: [],
});
// 计算出可选择的频道
const selectChannels = computed(() => {
  const channels = allChannels.value;
  const userchannels = userChannels.value.channels;
  if (channels.length === 0 || userchannels.length === 0) {
    return [];
  } else {
    return channels.filter((channel) => {
      return !userchannels.some(
        (userchannel) => userchannel?.id === channel?.id
      );
    });
  }
});
// 获取用户频道
async function getUserChannels() {
  const result = await reqUserChannels();
  // 判断请求是否成功
  if (result.status === 200) {
    userChannels.value = result.data.data;
  } else {
    return Promise.reject(result.data.message);
  }
}
// 获取所有频道
async function getAllChannels() {
  const result = await reqAllChanels();
  if (result.status === 200) {
    allChannels.value = result.data.data.channels;
  } else {
    return Promise.reject(result.data.message);
  }
}
// 编辑频道的回调
function showEdit() {
  editShow.value = true;
}
// 关闭编辑频道的回调
function closeEdit() {
  editShow.value = false;
}
// 删除频道的放法
async function deleteMyChannel(channelObj: {}) {
  const { id } = channelObj as { id: any };

  const result = await reqDeleteUserChannel(id);
  if (result.status === 204) {
    Toast.success("删除成功");
    const channels = userChannels.value.channels;
    channels.splice(
      channels.findIndex((channel) => channel.id === id),
      1
    );
  } else {
    Toast.fail("删除失败");
  }
}
// 展示添加的频道
function pushChannel(channelObj: {}) {
  const channels = userChannels.value.channels;
  channels.push(channelObj);
}
// 添加频道的回调
async function addMyChannel(channels: Array<{ id?: number }>) {
  const data = channels.map((channel, index) => {
    return {
      id: channel.id,
      seq: userChannels.value.channels.length + index,
    };
  });
  const result = await reqAddUserChannel({ channels: data });
  if (result.status === 201) {
    Toast.success("添加成功");
  } else {
    Toast.fail("添加失败");
  }
}
// 获取我的频道列表
getUserChannels().catch(() => {
  // 如果获取失败，则提醒获取失败
  Toast("获取频道列表失败");
});
// 获取全部频道列表
getAllChannels().catch(() => {
  Toast("获取频道列表失败");
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
    <van-tabs
      v-model:active="activeName"
      sticky
      offset-top="1.226667rem"
      animated
    >
      <van-tab
        :title="channel.name"
        v-for="(channel, index) in userChannels.channels"
        :key="channel.id"
        :name="channel.id"
      >
        <ArticleListVue :cid="activeName" />
      </van-tab>
    </van-tabs>
    <van-icon
      name="plus"
      size="0.3733334rem"
      class="moreChannels"
      @click="showEdit"
    />
  </div>
  <van-popup
    v-model:show="editShow"
    position="right"
    :duration="0.1"
    teleport="body"
    :style="{ height: '100%', width: '100%' }"
  >
    <ChannelEditVue
      :userChannels="userChannels.channels"
      :selectChannels="selectChannels"
      :activeId="activeName"
      @close="closeEdit"
      @delete="deleteMyChannel"
      @addChannel="addMyChannel"
      @pushChannel="pushChannel"
      v-model:activeId="activeName"
    />
  </van-popup>
</template>
<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}

.channel-tab {
  padding-top: 1.226667rem;
  padding-bottom: 1.78667rem;
}

:deep(.van-tabs__wrap) {
  padding-right: 30px;
  background-color: #fff;
}
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
</style>
