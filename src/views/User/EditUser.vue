<script setup lang="ts">
import { ref } from "vue";
import { Toast, Dialog } from "vant";
import { removeToken } from "@/utils/token";
import { reqUpdatePhoto, reqUpdateProfile } from "@/api";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { formatDate } from "@vueuse/shared";
const user = useUserStore();
const { userProfile, userInfo } = user;
const router = useRouter();
// 控制修改昵称的弹窗
const showName = ref(false);
// 控制修改简介的弹窗
const showIntro = ref(false);
// 控制修改性别的弹窗
const showGender = ref(false);
// 控制修改生日的弹窗
const showBirth = ref(false);
// 昵称
const name = ref("");
// 简介
const intro = ref("");
// 性别
const columns = ["男", "女"];
// 生日
const currentDate = ref(new Date());
const minDate = new Date(1900, 1, 1);
const maxDate = new Date();
// 上传图片的ref
const iptFile = ref();
// 点击显示修改昵称的弹窗
const showNamePop = () => {
  showName.value = true;
  name.value = userProfile.name;
};
// 点击显示修改简介的弹窗
const showIntroPop = () => {
  showIntro.value = true;
  intro.value = userInfo.intro;
};
// 点击图片触发input的click事件
function imageFn() {
  iptFile.value.click();
}
// 点击显示修改生日的弹窗
const showDatePop = () => {
  showBirth.value = true;
  currentDate.value = new Date(userProfile.birthday);
};
// 上传图片的回调
const onFileChange = async () => {
  const file = iptFile.value.files[0];
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append("photo", file);
  const res = await reqUpdatePhoto(formData);
  if (res.status === 200) {
    // 修改pinia中的数据
    user.changeUserPhoto(res.data.data.photo);
    Toast.success("修改头像成功");
  }
};
// 修改昵称
const submitName = async () => {
  const res = await reqUpdateProfile({ name: name.value });
  if (res.status === 200) {
    // 修改pinia中的数据
    user.changeUserName(name.value);
    Toast.success("修改昵称成功");
    showName.value = false;
  }
};
// 修改简介
const submitIntro = async () => {
  const res = await reqUpdateProfile({ intro: intro.value });
  if (res.status === 200) {
    // 修改pinia中的数据
    user.changeUserIntro(intro.value);
    Toast.success("修改简介成功");
    showIntro.value = false;
  }
};
// 修改性别
const submitGender = async (value: string, index: number) => {
  const res = await reqUpdateProfile({ gender: index });
  if (res.status === 200) {
    // 修改pinia中的数据
    user.changeUserGender(index.toString());
    Toast.success("修改性别成功");
    showGender.value = false;
  }
};
// 修改生日
const submitBirth = async () => {
  const res = await reqUpdateProfile({
    birthday: formatDate(currentDate.value, "YYYY-MM-DD"),
  });
  if (res.status === 200) {
    // 修改pinia中的数据
    user.changeUserBirthday(formatDate(currentDate.value, "YYYY-MM-DD"));
    Toast.success("修改生日成功");
    showBirth.value = false;
  }
};
// 退出登录
const logout = () => {
  Dialog.confirm({
    title: "退出",
    message: "确定要退出登录吗",
  })
    .then(() => {
      removeToken();
      user.$reset();
      router.replace("/login");
    })
    .catch(() => {});
};
// 获取用户信息
try {
  user.getUserProfile();
} catch (error) {}
</script>

<template>
  <div>
    <VanConfigProvider
      :theme-vars="{
        navBarBackgroundColor: '#fff',
        navBarIconColor: '#000',
        navBarTitleTextColor: '#000',
      }"
    >
      <van-nav-bar title="个人信息" left-arrow @click-left="router.back()" />

      <van-list>
        <van-cell title="头像">
          <template #value>
            <div class="profile-cell">
              <van-image
                round
                width="0.8rem"
                height="0.8rem"
                fit="cover"
                :src="userProfile.photo"
                @click="imageFn"
              ></van-image>
              <van-icon
                name="arrow"
                size="0.4rem"
                style="margin-left: 0.2rem"
                @click="imageFn"
              ></van-icon>
              <input
                type="file"
                ref="iptFile"
                v-show="false"
                accept="image/*"
                @change="onFileChange"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称">
          <div class="profile-cell">
            <p @click="showNamePop">{{ userProfile.name }}</p>
            <van-icon
              name="arrow"
              size="0.4rem"
              style="margin-left: 0.2rem"
              @click="showNamePop"
            ></van-icon>
            <van-popup
              teleport="body"
              v-model:show="showName"
              position="right"
              :style="{ width: '100%', height: '100%' }"
            >
              <van-nav-bar
                left-arrow
                title="修改昵称"
                right-text="提交"
                @click-left="showName = false"
                @click-right="submitName"
              >
              </van-nav-bar>
              <van-cell>
                <van-field
                  v-focus
                  v-model="name"
                  style="background-color: #f5f5f5; border-radius: 0.2rem"
                  placeholder="请输入昵称"
                  clearable
                ></van-field>
              </van-cell>
            </van-popup>
          </div>
        </van-cell>
        <van-cell title="简介">
          <div class="profile-cell">
            <p @click="showIntroPop">
              {{ userInfo.intro ? userInfo.intro : "未填写" }}
            </p>
            <van-icon
              @click="showIntroPop"
              name="arrow"
              size="0.4rem"
              style="margin-left: 0.2rem"
            ></van-icon>
            <van-popup
              v-model:show="showIntro"
              position="right"
              :style="{ width: '100%', height: '100%' }"
              teleport="body"
            >
              <van-nav-bar
                left-arrow
                title="修改昵称"
                right-text="提交"
                @click-left="showIntro = false"
                @click-right="submitIntro"
              >
              </van-nav-bar>
              <van-cell>
                <van-field
                  v-focus
                  v-model="intro"
                  style="background-color: #f5f5f5; border-radius: 0.2rem"
                  placeholder="请输入简介"
                  type="textarea"
                  clearable
                  maxlength="100"
                  show-word-limit
                ></van-field>
              </van-cell>
            </van-popup>
          </div>
        </van-cell>
        <van-cell title="性别">
          <div class="profile-cell">
            <p @click="showGender = true">
              {{ parseInt(userProfile.gender) === 0 ? "男" : "女" }}
            </p>
            <van-icon
              name="arrow"
              size="0.4rem"
              style="margin-left: 0.2rem"
              @click="showGender = true"
            ></van-icon>
            <van-popup
              v-model:show="showGender"
              round
              position="bottom"
              teleport="body"
            >
              <van-picker
                :columns="columns"
                :default-index="parseInt(userProfile.gender)"
                @cancel="showGender = false"
                @confirm="submitGender"
              />
            </van-popup>
          </div>
        </van-cell>
        <van-cell title="生日">
          <div class="profile-cell">
            <p @click="showDatePop">{{ userProfile.birthday }}</p>
            <van-icon
              @click="showDatePop"
              name="arrow"
              size="0.4rem"
              style="margin-left: 0.2rem"
            ></van-icon>
            <van-popup
              v-model:show="showBirth"
              teleport="body"
              position="bottom"
            >
              <div>
                <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  title="选择年月日"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @cancel="showBirth = false"
                  @confirm="submitBirth"
                />
              </div>
            </van-popup>
          </div>
        </van-cell>
      </van-list>
      <!-- 退出登录按钮 -->
      <div class="logout">
        <span @click="logout">退出登录</span>
      </div>
    </VanConfigProvider>
  </div>
</template>

<style scoped lang="less">
.profile-cell {
  float: right;
  display: flex;
  justify-content: end;
  align-items: center;
}

.logout {
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0.8rem;
  width: 100%;
  color: #fc6627;
  font-size: 0.4rem;
}
</style>
