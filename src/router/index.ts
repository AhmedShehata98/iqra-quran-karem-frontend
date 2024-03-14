import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      name: "reciter",
      path: "/reciter",
      component: () => import("@/views/RecitersView.vue"),
    },
    {
      name: "surahs",
      path: "/reciter/:reciterId",
      component: () => import("@/views/SurahsView.vue"),
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
