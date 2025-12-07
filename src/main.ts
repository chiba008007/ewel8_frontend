import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import { useStoreUser } from "@/store/user";

loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// ★ pinia を先にセット
app.use(pinia);

// ★ pinia 初期化後に token を読む（これが大事）
const user = useStoreUser();
if (user.userToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.userToken}`;
}

// その後に他の plugin
app.use(router).use(store).use(vuetify);

// ★ mount（最後）
app.mount("#app");
