<script setup lang="ts">
import { ref, reactive } from "vue";
import { reqNotify } from "@/api";
const loading = ref(false);
const finished = ref(false);
const params = reactive({
  page: 1,
  per_page: 10,
});
const { type } = defineProps<{ type: number }>();
const notify = ref<Array<{ [propName: string]: any }>>([]);
// list的load方法
const onLoad = () => {
  params.page++;
  getNotify().catch(()=>{});
};
// 获取消息通知的方法
const getNotify = async () => {
  const param = {
    page: params.page,
    per_page: params.per_page,
    type: type === 0 ? null : type,
  };
  loading.value = false
  const res = await reqNotify(param);
  if (res.status === 200) {
    notify.value.push(...res.data.data.results);
    if (res.data.data.total_count !== 10) {
      finished.value = true;
    }
  } else {
    return Promise.reject("获取数据失败");
  }
};
// 获取消息
getNotify().catch(() => {
  console.log("获取数据失败");
});
</script>

<template>
  <van-empty description="暂无消息" v-if="notify.length===0"></van-empty>
  <van-list
    v-else
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="item" v-for="(item, index) in notify" :key="item.id">
      <p class="notify-type">
        <div>
          <span>{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
        </div>
        <div>
          <span class="time">{{item.create_time}}</span>
        </div>
      </p>
      <p class="comment-target" v-if="item.comment_target">
        {{item.comment_target}}
      </p>
      <p class="comment-content" v-if="item.comment_content">
        {{item.title}}说：{{item.comment_content}}
      </p>
    </div>
  </van-list>
</template>

<style scoped lang="less">
.item {
  background-color: #fff;
  padding: 0.5rem 0.3rem 0.2rem;
  font-size: 0.36rem;
  border-bottom: 1px solid #f5f5f5;
  .notify-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      color: #999;
      margin-left: 10px;
    }
    .time {
      color: #999;
      font-size: 0.24rem;
    }
  }
  .comment-target {
    background: #f7f8fa;
    border-radius: 0.10667rem;
    padding: 0.26667rem;
    margin: 0.13333rem 0;
    color: #868a97;
  }
  .comment-content {
    margin: 0.13333rem 0;
    color: #868a97;
  }
}
</style>
