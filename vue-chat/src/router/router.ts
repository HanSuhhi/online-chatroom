import * as VueRouter from "vue-router";

import authPage from "../pages/auth.vue";

const routes = [
  { path: "/auth", component: authPage },
  { path: "/", redirect: "/auth" },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
