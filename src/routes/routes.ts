import LoginVue from "@/views/Login.vue";
import HomeVue from "@/views/Home.vue";
import UserVue from "@/views/User.vue";
import LayoutVue from "@/views/Layout.vue";

export default [
  {
    path: "/login",
    name: "Login",
    component: LoginVue,
  },
  {
    path: "/",
    component: LayoutVue,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: HomeVue,
      },
      {
        path: "user",
        name: "User",
        component: UserVue,
      },
    ],
  },
];
