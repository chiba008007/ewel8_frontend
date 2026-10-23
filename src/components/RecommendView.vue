<script setup lang="ts">
const props = defineProps<{
  recomendflag?: boolean;
}>();
</script>
<template>
  <div v-if="props.recomendflag">
    <v-card variant="tonal" class="mt-8">
      <v-card-title class="text-red text-subtitle-1"
        >推奨OS・推奨ブラウザ</v-card-title
      >
      <v-card-text>
        安全で快適にご利用いただくために、下記OSと下記バージョンのブラウザのご利用をお勧めいたします。<br />
        推奨ウェブブラウザ以外でのご利用や、推奨ウェブブラウザでもお客さまの設定によっては、ご利用できない場合や正しく表示されない場合があります。<br />
        <br />
        <div class="font-weight-bold">Windowsをお使いの場合</div>
        <dl>
          <dt>推奨OS:</dt>
          <dd class="ml-2">Windows10以上</dd>
          <dt>推奨ブラウザ:</dt>
          <dd class="ml-2">Microsoft Edge 最新版</dd>
          <dd class="ml-2">Mozilla FireFox 最新版</dd>
          <dd class="ml-2">Google Chrome 最新版</dd>
        </dl>
        <div class="font-weight-bold">Macをお使いの場合</div>
        <dl>
          <dt>推奨OS:</dt>
          <dd class="ml-2">最新版</dd>
          <dt>推奨ブラウザ:</dt>
          <dd class="ml-2">Safari 最新版</dd>
        </dl>
      </v-card-text>
    </v-card>

    <v-card variant="tonal" class="mt-4">
      <v-card-title class="text-red text-subtitle-1"
        >Javascript・cookieの設定</v-card-title
      >
      <v-card-text>
        ブラウザ設定でJavascriptの設定を有効にしてください。<br />
        Javascriptの設定を無効にされている場合、正しく機能しない、もしくは正しく表示されないことがあります。<br />
        また、一部cookieを利用したコンテンツがございます。Javascript同様設定を有効にしてください。
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/util.scss";
</style>
