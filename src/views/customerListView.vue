<script setup lang="ts">
import { ref, defineEmits } from "vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const pankuzu = [
  { title: "HOME", href: router.resolve({ name: "List" }).href },
  { title: "パートナー情報一覧" },
];
pankuzu.push({ title: "顧客情報一覧" });

const tab = ref(0);
</script>
<template>
  <v-row justify="center" class="pa-3 pb-0">
    <v-col>
      <v-alert
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
        title="Alert title"
        variant="outlined"
      ></v-alert>
    </v-col>
  </v-row>
  <v-row justify="center">
    <CustomerMenu />
  </v-row>

  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-row>
    <v-col class="ma-1">
      <v-tabs v-model="tab">
        <v-tab value="1">顧客一覧</v-tab>
        <v-tab value="2">検査一覧</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="1"> aaa </v-window-item>
        <v-window-item value="2"> bbb </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
