<script setup lang="ts">
import { reactive, ref } from "vue";
// 要添加的频道的列表
const addChannels = ref<Array<{ id: number }>>([]);
// 控制我的频道的编辑的状态
const editState = reactive({
  iconShow: false,
  buttonText: "编辑",
});
// 接受用户频道和可选频道
const props = defineProps<{
  userChannels: Array<{ [propName: string]: any }>;
  selectChannels: Array<{ [propName: string]: any }>;
  activeId: number;
}>();
// 接受父组件传递的方法
const emits = defineEmits<{
  (e: "close"): void;
  (e: "delete", channelObj: {}): void;
  (e: "addChannel", channels: Array<{}>): void;
  (e: "pushChannel", channelObj: {}): void;
  (e: "update:activeId", id: number): void;
}>();
// 关闭窗口的回调
function closeEdit() {
  editState.iconShow = false;
  editState.buttonText = "编辑";
  emits("close");
}
// 删除频道的回调
function deleteChannel(channelObj: {}) {
  emits("delete", channelObj);
}
// 将选中的频道整合到要添加的频道列表中
function pushChannel(channel: {}) {
  const target = channel as { id: number };
  if (addChannels.value.some((item) => item.id === target.id)) {
    return;
  }
  addChannels.value.push(target);
  emits("pushChannel", target);
}
// 编辑或完成按钮的回调
function editChannel() {
  if (editState.buttonText === "完成") {
    const channels = addChannels.value;
    emits("addChannel", channels);
    addChannels.value = [];
  }
  editState.iconShow = !editState.iconShow;
  editState.buttonText = editState.buttonText === "编辑" ? "完成" : "编辑";
}
// 切换频道
function updateActiveId(id: number) {
  if (id === props.activeId) return;
  if (!editState.iconShow) {
    emits("update:activeId", id);
  }
}
</script>

<template>
  <van-icon
    name="cross"
    color="#c8c9cc"
    size="0.5rem"
    class="cross-icon"
    @click="closeEdit"
  ></van-icon>
  <div class="edit-channel">
    <!-- 我的频道的标题 -->
    <div class="chosen-title">
      <div>
        <span class="title">我的频道:</span>
        <span class="tip">点击进入频道</span>
      </div>
      <van-button
        @click="editChannel"
        type="warning"
        size="mini"
        plain
        hairline
        round
        style="width: 1.493333rem; height: 0.58667rem"
        >{{ editState.buttonText }}</van-button
      >
    </div>
    <!-- 我的频道的列表 -->
    <div class="chosen-list">
      <div
        class="item"
        v-for="(channel, index) in props.userChannels"
        :key="channel.id"
      >
        <van-badge color="#ccc" :offset="['-0.1rem', '0.15rem']">
          <span
            :style="{ color: activeId == channel.id ? '#fc6627' : '#000' }"
            @click="updateActiveId(channel.id)"
            >{{ channel.name }}</span
          >
          <template #content>
            <van-icon
              name="cross"
              class="badge-icon"
              v-show="editState.iconShow && index !== 0"
              @click="deleteChannel(channel)"
            />
          </template>
        </van-badge>
      </div>
    </div>
    <!-- 可选频道的标题 -->
    <div class="chosen-title">
      <div>
        <span class="title">可选频道:</span>
      </div>
    </div>
    <!-- 可选频道的列表 -->
    <div class="chosen-list">
      <div
        class="item"
        v-for="(channel, index) in props.selectChannels"
        :key="channel.id"
      >
        <van-badge
          :color="editState.iconShow ? '#CCC' : '#fff'"
          :offset="['-0.1rem', '0.15rem']"
        >
          <span>{{ channel.name }}</span>
          <template #content>
            <van-icon
              name="plus"
              class="badge-icon"
              v-show="editState.iconShow"
              @click="pushChannel(channel)"
            />
          </template>
        </van-badge>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cross-icon {
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
}
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
.edit-channel {
  margin-top: 30px;
  padding: 20px;
}
.edit-channel .chosen-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-channel .chosen-title .title {
  font-size: 14px;
  margin-right: 5px;
}

.edit-channel .chosen-title .tip {
  font-size: 10px;
  color: #999;
}

.chosen-list {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  margin-top: 20px;
}

.chosen-list .item {
  margin-right: 15px;
  margin-bottom: 15px;
}

.chosen-list .item span {
  display: inline-block;
  padding: 0 3px;
  min-width: 60px;
  height: 33px;
  border-radius: 18px;
  background-color: #f7f8fa;
  font-size: 13px;
  text-align: center;
  line-height: 33px;
}
</style>
