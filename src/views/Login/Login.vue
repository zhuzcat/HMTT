<template>
  <van-nav-bar title="黑马头条-登录" />
  <van-form @submit="onSubmit" :style="{ marginTop: '15px' }">
    <van-cell-group inset>
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^1[3456789]\d{9}$/, message: '请填写正确的手机号' },
        ]"
      />
      <van-field
        v-model="code"
        type="password"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写6位数字验证码' },
        ]"
      >
        <template #button>
          <van-button size="small" @click="getCode" :disabled="isLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :disabled="isLoading"
        :loading="isLoading"
        loading-type="spinner"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { Notify } from "vant";
import { Toast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "@/api";
import { setToken } from "@/utils/token";
// 表单的状态
const mobile = ref("");
const code = ref("");
const isLoading = ref(false);
// 创建router实例
const router = useRouter();

// 获取验证码的方法
function getCode() {
  code.value = "246810";
  Toast("验证码已发送为246810");
}

// 提交登录表单的方法
async function onSubmit() {
  // 将isLoading设置为true，表示正在提交
  isLoading.value = true;
  // 发送登录请求
  try {
    const result = await loginApi({
      mobile: mobile.value,
      code: code.value,
    });
    // 将isLoading设置为false
    isLoading.value = false;
    // 登录成功将token保存到localStorage
    setToken(result.data.data.token);
    localStorage.setItem("refresh_token", result.data.data.refresh_token);
    // 提示登录成功
    Notify({
      message: "登录成功",
      duration: 1500,
      type: "success",
    });
    // 跳转到首页
    router.replace("/home");
  } catch (err) {
    // 将isLoading设置为false
    isLoading.value = false;
    // 提示登录失败
    Notify({
      message: "登录失败",
      duration: 1500,
      type: "danger",
    });
  }
}
</script>

<style scoped></style>
