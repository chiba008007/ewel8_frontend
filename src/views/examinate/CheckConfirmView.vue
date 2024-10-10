<script setup lang="ts">
import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
</script>

<template>
  <ExamTitle
    :logo-src="require('@/assets/logo.png')"
    :customer-name="`test企業`"
  />

  <v-container>
    <div class="text-h6 font-weight-bold mb-4">動作環境チェック</div>
    <p class="mb-4">
      本検査受検前に、当ページで動作環境の確認をお願いします。<br />
      ※各ソフトウェアベンダーのサポート終了等により、システム条件が変更される場合がございます。予めご了承ください。<br />
      <br />
      ご利用中のパソコン端末情報は、以下「動作環境チェック」ボタンからご確認できます。
    </p>
    <ComponentButton
      text="動作環境チェック"
      color="primary"
      @onClick="$router.push({ name: 'examCheck' })"
    />
  </v-container>
</template>
