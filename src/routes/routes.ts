export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search/Search.vue"),
  },
  {
    path: "/search/:keyword",
    name: "SearchResult",
    component: () => import("@/views/Search/SearchResult.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("@/views/Detail/Detail.vue"),
  },
  {
    path: "/edituser",
    name: "EditUser",
    meta: {
      keepAlive: true,
    },
    component: () => import("@/views/User/EditUser.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    meta: {
      keepAlive: true,
    },
    component: () => import("@/views/Chat/Chat.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout.vue"),
    meta: {
      keepAlive: true,
    },
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home/Home.vue"),
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/User/User.vue"),
      },
    ],
  },
];
