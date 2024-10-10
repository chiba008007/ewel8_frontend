import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStoreUser } from "../store/user";
import HomeView from "../views/HomeView.vue";
import HelloWorldView from "../views/HelloWorld.vue";
import LoginView from "../views/LoginView.vue";
import ListView from "../views/ListView.vue";
import partnerRegistView from "../views/partnerRegistView.vue";
import partnerEditView from "../views/partnerEditView.vue";
import addPertner from "../views/addPertnerView.vue";
import customerList from "../views/customerListView.vue";
import addCustomer from "../views/addCustomer.vue";
import ErrorView from "../views/errorView.vue";
import ExamView from "../views/examinate/ExamView.vue";
import ExamProfileView from "../views/examinate/ProfileView.vue";
import ExamChecConfirmkView from "../views/examinate/CheckConfirmView.vue";
import ExamCheckView from "../views/examinate/CheckView.vue";
import ExamBrowserUpdateHelpView from "../views/examinate/BrowsserUpdateHelpView.vue";

import store from "@/store";

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
    path: "/list",
    name: "List",
    component: ListView,
    meta: {
      requiresAuth: true, // ログインしないと入れないページ
    },
  },
  {
    path: "/partnerRegist",
    name: "partnerRegist",
    component: partnerRegistView,
    meta: {
      requiresAuth: true, // ログインしないと入れないページ
    },
  },
  {
    path: "/partnerEdit/:id",
    name: "partnerEdit",
    component: partnerEditView,
    meta: {
      requiresAuth: true, // ログインしないと入れないページ
    },
  },
  {
    path: "/addPertner",
    name: "addPertner",
    component: addPertner,
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
  {
    path: "/error",
    name: "error",
    component: ErrorView,
  },

  // 企業画面
  {
    path: "/customerList/:id",
    name: "customerList",
    component: customerList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addCustomer/:id",
    name: "addCustomer",
    component: addCustomer,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/exam",
    name: "exam",
    component: ExamView,
  },
  {
    path: "/exam/profile",
    name: "examProfile",
    component: ExamProfileView,
  },
  {
    path: "/exam/checkConfirm",
    name: "examCheckConfirm",
    component: ExamChecConfirmkView,
  },
  {
    path: "/exam/check",
    name: "examCheck",
    component: ExamCheckView,
  },
  {
    path: "/exam/browserUpdateHelp",
    name: "examBrowserUpdateHelp",
    component: ExamBrowserUpdateHelpView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // ...
  // explicitly return false to cancel the navigation
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = useStoreUser();
  const isLogin = user.isLogin;

  //  const type = (user.userdata as any).type;

  if (requiresAuth) {
    if (isLogin && requiresAuth == true) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }
  next();
});
export default router;
