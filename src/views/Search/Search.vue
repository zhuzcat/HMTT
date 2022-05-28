<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { reqSearchSuggest } from "@/api";
const historys = ref(JSON.parse(localStorage.getItem("his") || "[]"));
const router = useRouter();
// 搜索的关键词
const keyword = ref("");
// 用于防抖的定时器的标识
const timer = ref();
// 搜索的建议
const suggestions = ref<Array<string>>([]);
// 监视historys的变化来操作localStorage
watch(
  historys,
  (val) => {
    const theSet = new Set(val as Array<string>);
    const arr = Array.from(theSet);
    localStorage.setItem("his", JSON.stringify(arr));
  },
  { deep: true }
);
// 清空历史搜索记录
const clearHistory = () => {
  historys.value = [];
};
// 获取搜索 建议
const getSuggestion = async () => {
  if (timer.value) {
    clearTimeout(timer.value);
    suggestions.value = [];
  }
  timer.value = setTimeout(async () => {
    if (keyword.value.length > 0) {
      const res = await reqSearchSuggest(keyword.value);
      const result = res.data.data.options as Array<string>;
      suggestions.value = result;
    }
  }, 500);
};
// 高亮显示关键词
const highlight = (keyword: string, text: string) => {
  if (!text) {
    return text;
  }
  const reg = new RegExp(keyword, "ig");
  return text.replace(
    reg,
    (match) => `<span style="color:orange">${match}</span>`
  );
};
// 搜索结果
function toSearchResult(keyword: string) {
  if (keyword.length > 0) {
    historys.value.unshift(keyword);
  }
  setTimeout(() => {
    router.push({
      path: `/search/${keyword}`,
    });
  }, 0);
}
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-focus
      v-model="keyword"
      shape="round"
      background="#1989fa"
      placeholder="请输入搜索关键词"
      @update:model-value="getSuggestion"
      @search="toSearchResult(keyword)"
    >
      <template #left>
        <van-icon
          name="arrow-left"
          size="0.5rem"
          style="margin-right: 0.3rem"
          color="white"
          @click="router.back()"
        ></van-icon>
      </template>
    </van-search>
    <!-- 搜索建议列表 -->
    <van-list>
      <van-cell
        v-for="(item, index) in suggestions"
        :key="index"
        v-html="highlight(keyword, item)"
        icon="search"
        @click="toSearchResult(item)"
      />
    </van-list>
    <!-- 搜索历史 -->
    <div class="history" v-show="suggestions.length == 0">
      <van-cell
        title="搜索历史"
        icon="search"
        style="background-color: #ebedf0"
      >
        <template #right-icon>
          <van-icon name="delete" class="delete-icon" @click="clearHistory" />
        </template>
      </van-cell>
      <div class="history-list">
        <div class="item" v-for="(item, index) in historys" :key="index">
          <span @click="toSearchResult(item)">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-icon {
  font-size: 16px;
  line-height: inherit;
}
.history {
  padding: 5px;
}

.history-list {
  padding: 5px 10px;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
}
.item {
  margin-right: 15px;
  margin-bottom: 15px;
}

.item span {
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
