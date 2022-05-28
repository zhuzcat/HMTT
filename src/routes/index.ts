import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/utils/token";
import { useUserStore } from "@/store";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (getToken() && to.path === "/login") {
    console.log(2);
    next({ path: "/" });
  } else {
    next();
  }
});
// 路由后置守卫
router.afterEach((to, from) => {
  const user = useUserStore();
  if (to.path === "/user" || to.path === "/useredit" || to.path === "/chat") {
    if (!user.userInfo.id) {
      user.getUserInfo();
    }
  }
});

export default router;
