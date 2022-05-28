<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
const router = useRouter();
const user = useUserStore();
const { userInfo } = user;
</script>

<template>
  <div class="user-profile">
    <div class="user-info">
      <van-image
        round
        fit="cover"
        width="1.2rem"
        height="1.2rem"
        :src="userInfo.photo"
      ></van-image>
      <h3 class="name">{{ userInfo.name }}</h3>
      <a class="btn" @click="router.push('/edituser')">
        个人信息
        <van-icon name="arrow" size="0.2rem" />
      </a>
    </div>
    <div class="info-row">
      <div class="info-col">
        <p>{{ userInfo.art_count }}</p>
        <p>动态</p>
      </div>
      <div class="info-col">
        <p>{{ userInfo.follow_count }}</p>
        <p>关注</p>
      </div>
      <div class="info-col">
        <p>{{ userInfo.fans_count }}</p>
        <p>粉丝</p>
      </div>
      <div class="info-col">
        <p>{{ userInfo.like_count }}</p>
        <p>被赞</p>
      </div>
    </div>
    <div class="user-link info-row">
      <div class="info-col">
        <van-icon name="envelop-o" size="0.6rem" />
        <p class="link">消息通知</p>
      </div>
      <div class="info-col">
        <van-icon name="like-o" size="0.6rem" />
        <p class="link">我的收藏</p>
      </div>
      <div class="info-col">
        <van-icon name="underway-o" size="0.6rem" />
        <p class="link">阅读历史</p>
      </div>
      <div class="info-col">
        <van-icon name="edit" size="0.6rem" />
        <p class="link">我的作品</p>
      </div>
    </div>
  </div>
  <div class="more">
    <p class="title">更多服务</p>
    <div class="more-row">
      <div class="more-col">
        <van-icon name="question-o" size="0.6rem" />
        <p>用户反馈</p>
      </div>
      <div class="more-col">
        <van-icon
          name="service"
          size="0.6rem"
          color="orange"
          @click="router.push('/chat')"
        />
        <p>小智同学</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-profile {
  width: 100%;
  padding: 0 0.4rem;
  height: 6.4rem;
  display: block;
  background: linear-gradient(318deg, #b2b5db, #565482 70%, #494675);
  color: #fff;
  border-bottom-left-radius: 10.66667rem 1.6rem;
  border-bottom-right-radius: 10.66667rem 1.6rem;
  margin-bottom: 1.28rem;
  .user-info {
    display: flex;
    padding: 1.06667rem 0;
    height: 3.46667rem;
    align-items: center;
    .name {
      font-size: 0.53333rem;
      font-weight: 400;
      margin-left: 0.26667rem;
      flex: 1;
    }
    .btn {
      color: #fff;
      line-height: 1;
      font-size: 0.32rem;
    }
  }
  .info-row {
    display: flex;
    .info-col {
      flex: 1;
      p {
        text-align: center;
        font-size: 14px;
      }
      .link {
        padding-top: 5px;
        font-size: 0.32rem;
      }
    }
  }
  .user-link {
    padding: 0.53333rem 0;
    font-size: 0.32rem;
    text-align: center;
    background-color: #fff;
    border-radius: 0.26667rem;
    color: #333;
    position: relative;
    top: 0.53333rem;
  }
}
.more {
  margin: 0 0.4rem;
  background-color: #fff;
  border-radius: 0.26667rem;
  height: 3.2rem;
  .title {
    font-size: 14px;
    padding: 15px;
  }
  .more-row {
    text-align: center;
    display: flex;
    .more-col {
      width: 25%;
      text-align: center;
      p {
        text-align: center;
        font-size: 0.32rem;
      }
    }
  }
}
</style>
