import { defineStore } from "pinia";
import { reqUserProfile, reqUserInfo } from "@/api";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userProfile: {
        id: "",
        name: "",
        photo: "",
        mobile: "",
        gender: "",
        birthday: "",
      },
      userInfo: {
        id: "",
        name: "",
        photo: "",
        is_media: "",
        intro: "",
        certi: "",
        art_count: "",
        follow_count: "",
        fans_count: "",
        like_count: "",
      },
    };
  },
  actions: {
    // 获取用户资料
    async getUserProfile() {
      const res = await reqUserProfile();
      if (res.status === 200) {
        Object.assign(this.userProfile, res.data.data);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await reqUserInfo();
      if (res.status === 200) {
        Object.assign(this.userInfo, res.data.data);
      }
    },
    // 修改头像
    changeUserPhoto(photo: string) {
      this.userInfo.photo = photo;
      this.userProfile.photo = photo;
    },
    // 修改昵称
    changeUserName(name: string) {
      this.userInfo.name = name;
      this.userProfile.name = name;
    },
    // 修改简介
    changeUserIntro(intro: string) {
      this.userInfo.intro = intro;
    },
    // 修改性别
    changeUserGender(index: string) {
      this.userProfile.gender = index;
    },
    // 修改生日
    changeUserBirthday(birth: string) {
      this.userProfile.birthday = birth;
    },
  },
});
