import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "mandelbrot-julia",
    component: () => import("../views/MandelbrotJuliaView.vue"),
  },
  {
    path: "/attractor",
    name: "attractor",
    component: () => import("../views/StrangeAttractorView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
