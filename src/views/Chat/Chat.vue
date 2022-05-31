<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { io } from "socket.io-client";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getToken } from "@/utils/token";
const user = useUserStore();
const router = useRouter();
// 存储socket
let socket: any;
// 存储输入内容
const inputValue = ref("");
// 存储聊天内容
const list = reactive([{ name: "xz", content: "你好，请问有什么可以帮您的" }]);
// 显示最新的聊天内容
const showList = () => {
  const theDiv = document.querySelector(".chat-list>div:last-child");
  theDiv?.scrollIntoView({ behavior: "smooth" });
};
// 发送消息
const send = () => {
  const content = inputValue.value;
  if (content) {
    socket.emit("message", {
      msg: content,
      timestamp: new Date().getTime(),
    });
    list.push({
      name: "me",
      content,
    });
    inputValue.value = "";
    nextTick(showList);
  }
};
// 建立 socket 链接
function connect() {
  socket = io("http://geek.itheima.net", {
    query: {
      token: getToken(),
    },
    transports: ["websocket"],
  });
  socket.on("message", (data: any) => {
    list.push({
      name: "xz",
      content: data.msg,
    });
    nextTick(showList);
  });
}
connect();
</script>

<template>
  <div class="container">
    <VanConfigProvider
      :theme-vars="{
        navBarBackgroundColor: '#fff',
        navBarIconColor: '#000',
        navBarTitleTextColor: '#000',
      }"
    >
      <!-- 固定导航 -->
      <van-nav-bar
        fixed
        left-arrow
        title="小智同学"
        @click-left="router.back()"
      ></van-nav-bar>
    </VanConfigProvider>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小智 -->
        <div class="chat-item left" v-if="item.name === 'xz'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ item.content }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ item.content }}</div>
          <van-image fit="cover" round :src="user.userInfo.photo" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="inputValue">
        <template #button>
          <van-button
            type="primary"
            size="small"
            @click="send"
            :disabled="!inputValue"
            >发送</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  min-height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
