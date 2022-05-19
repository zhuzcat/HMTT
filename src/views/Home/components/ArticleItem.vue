<script setup lang="ts">
import { ref, reactive } from "vue";
import { timeAgo } from "@/utils/date";
import { firstActions, secondActions } from "@/config/action";
// 接受文章列表的数据
const { item } = defineProps<{
  item: {
    [propName: string]: any;
  };
}>();
// 接受发送请求的方法
const emits = defineEmits<{
  (e: "unlike", id: string): void;
  (e: "report", target: string, type: string): void;
}>();
// 定义举报框的展示标识
const show = ref(false);
// 定义举报框的内容
const content = reactive<{ actions: Array<{}>; cancelText: string }>({
  actions: [],
  cancelText: "取消",
});
// 点击展示举报框的回调
function showReport() {
  content.actions = firstActions;
  content.cancelText = "取消";
  show.value = true;
}
// 选择的回调
function handleSelect(action: { name: string; value: number }, index: number) {
  if (action.name === "不感兴趣") {
    // 不感兴趣发送请求
    emits("unlike", item.art_id);
    show.value = false;
  } else if (action.value !== undefined) {
    // 举报发送请求
    emits("report", item.art_id, action.value.toString());
    show.value = false;
  } else {
    // 选择二级菜单，显示二级菜单
    content.actions = secondActions;
    content.cancelText = "返回";
  }
}
// 取消的回调
function handleCancel() {
  if (content.cancelText === "返回") {
    content.actions = firstActions;
    content.cancelText = "取消";
    show.value = true;
  }
}
</script>

<template>
  <van-cell>
    <template #title>
      <div class="title-box">
        <span>{{ item.title }}</span>
        <img
          v-if="item.cover!.type === 1"
          class="thumb"
          :src="item.cover!.images[0]"
        />
      </div>
      <div class="thumb-box" v-if="item.cover!.type === 3">
        <img
          class="thumb"
          :src="img"
          v-for="(img, index) in item.cover!.images"
          :key="index"
        />
      </div>
    </template>

    <template #label>
      <div class="label-box">
        <div>
          <span>{{ item.aut_name }}</span>
          <span>{{ item.comm_count }} 评论</span>
          <span>{{ timeAgo(item.pubdate) }}</span>
        </div>
        <van-icon name="cross" @click="showReport"></van-icon>
      </div>
    </template>
  </van-cell>
  <van-action-sheet
    v-model:show="show"
    teleport="body"
    :actions="content.actions"
    :cancel-text="content.cancelText"
    @select="handleSelect"
    @cancel="handleCancel"
  />
</template>

<style scoped lang="less">
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
/* label描述样式 */
.label-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 文章信息span */
.label-box span {
  margin: 0 5px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
