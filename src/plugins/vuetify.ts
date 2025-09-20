// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { ja } from "vuetify/locale";

// Vuetify
import { createVuetify } from "vuetify";
export default createVuetify({
  locale: {
    locale: "ja", // デフォルトロケールを日本語に
    fallback: "en", // フォールバックを英語に
    messages: { ja }, // 日本語ロケールを登録
  },
});
// export default createVuetify();
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
