import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStoreUser } from "../store/user";
import HomeView from "../views/HomeView.vue";
import HelloWorldView from "../views/HelloWorld.vue";
import LoginView from "../views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true, // ログインしないと入れないページ
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   // console.log(requiresAuth);
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log(auth.loginedId());
//   }
// });

router.beforeEach((to) => {
  // ...
  // explicitly return false to cancel the navigation
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = useStoreUser();
  const isAuthenticated = user.userToken;

  if (
    // make sure the user is authenticated
    isAuthenticated &&
    // Avoid an infinite redirect
    to.name === "Login"
  ) {
    // redirect the user to the login page
    return { name: "Home" };
  }

  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // Avoid an infinite redirect
    to.name !== "Login" &&
    requiresAuth == true
  ) {
    // redirect the user to the login page
    return { name: "Login" };
  }
});
export default router;
