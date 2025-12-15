import { createWebHistory, createRouter } from "vue-router";

// Three simple routes: fractal explorer, attractors playground and about page.
const routes = [
  {
    path: "/",
    name: "mandelbrot-julia",
    component: () => import("../views/MandelbrotJuliaView.vue"),
  },
  {
    path: "/attractors",
    name: "attractors",
    component: () => import("../views/AttractorView.vue"),
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
