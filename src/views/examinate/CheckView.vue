<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentDialogButton from "@/components/DialogButton.vue";
import ExamTitle from "@/components/ExamTitle.vue";

type Result = {
  [key in "os" | "browser" | "js"]: {
    title: string;
    isSuccess: boolean;
    comment: string;
  };
};
const result = ref<Result>({
  os: {
    title: "OS",
  },
  browser: {
    title: "ブラウザ",
  },
  js: {
    title: "javascript",
    isSuccess: true,
    comment: "設定されています。",
  },
});

// TODO: 判定処理
result.value.os.isSuccess = true;
result.value.os.comment = "Windows 10";
result.value.browser.isSuccess = false;
result.value.browser.comment = "Chrome129.0.0.0";
</script>

<template>
  <ExamTitle
    :logo-src="require('@/assets/logo.png')"
    :customer-name="`test企業`"
  />

  <v-container>
    <div class="text-h6 font-weight-bold mb-4">動作環境チェック結果</div>
    <p class="mb-4">
      ご利用のパソコン及びブラウザを自動でチェックしています。
      すべてのチェック項目の判定に「<span class="text-red">〇</span
      >」が表示されているか、ご確認ください。<br />
      <br />
      「<span class="text-blue">×</span>」
      が表示されている場合、そのチェック項目「対処方法」欄に表示される「詳細」ボタンを参照の上、再度「動作環境チェック」をお試しください。対処しても改善されない場合は、担当者に問い合わせください。<br />
      <br />
      <span class="text-red">〇</span>
      ：問題ありません<br />
      <span class="text-blue">&nbsp;×</span>
      ：対処方法を確認ください要確認内容を確認ください
    </p>
    <v-sheet width="100%" color="blue-darken-1" class="pa-4 mb-4">
      動作環境チェックに問題がない場合であっても、パソコンの性能や他のアプリケーションや常駐ソフト等の影響により正常に動作しなかったり、フリーズ状態になる場合があります。
    </v-sheet>
    <v-table class="mb-4">
      <thead>
        <tr>
          <th class="font-weight-bold">チェック項目</th>
          <th class="font-weight-bold">判定</th>
          <th class="font-weight-bold">内容</th>
          <th class="font-weight-bold text-no-wrap">対処方法</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result" :key="item">
          <th class="text-no-wrap font-weight-bold">{{ item.title }}</th>
          <td v-if="item.isSuccess" class="text-red">〇</td>
          <td v-else class="text-blue">×</td>
          <td class="text-no-wrap">{{ item.comment }}</td>
          <td class="text-no-wrap">
            <router-link :to="{ name: 'examBrowserUpdateHelp' }" target="_blank"
              >詳細へ</router-link
            >
          </td>
        </tr>
      </tbody>
    </v-table>

    <ComponentDialogButton
      text="戻る"
      message="ログイン画面に戻ります。よろしいですか？"
      @onOkClick="$router.push({ name: 'exam' })"
    />
    <ComponentButton
      text="次へ"
      color="primary"
      :disabled="
        !result.os.isSuccess ||
        !result.browser.isSuccess ||
        !result.js.isSuccess
      "
    />
  </v-container>
</template>
