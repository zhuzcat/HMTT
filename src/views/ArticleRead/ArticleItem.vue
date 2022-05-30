<script setup lang="ts">
import { useRouter } from "vue-router";
import { timeAgo } from "@/utils/date";
const router = useRouter();
const { item } = defineProps<{ item: { [propName: string]: any } }>();
</script>

<template>
  <van-cell :title="item.title" @click="router.push(`/detail/${item.art_id}`)">
    <template #label>
      <div class="info">
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ timeAgo(item.pubdate) }}</span>
      </div>
    </template>
  </van-cell>
</template>

<style scoped lang="less">
.info {
  span {
    margin-right: 5px;
  }
}
</style>
