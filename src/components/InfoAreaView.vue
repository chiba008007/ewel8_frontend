<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStoreUser } from "@/store/user";
import { useRoute } from "vue-router";
import AlertView from "./AlertView.vue";
import InformationApiService from "@/services/InformationApiService";

const user = useStoreUser();
const route = useRoute();
const tmpid = route.params.id;
const info = ref();
onMounted(async () => {
  const rlt = await InformationApiService.getInformation({ id: tmpid });
  info.value = rlt.data.informations;
  console.log(info.value);
});
function formatText(text: string | null | undefined) {
  if (!text) return "";
  return text.replace(/\n/g, "<br>");
}

const formatDateOnly = (dateStr?: string | null) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}/${m}/${day}`;
};
</script>
<template>
  <v-row justify="center" class="pa-3 pb-0">
    <v-col v-for="i in info" :key="i.id" :cols="info.length <= 1 ? 12 : 6">
      <v-alert>
        {{ formatDateOnly(i.started_at) }}
        <template #title>
          {{ i.title }}
        </template>
        <!-- 改行を HTML として扱う -->
        <div v-if="i.file">
          <a target="_blank" :href="i.file">添付ファイル</a>
        </div>
        <div class="note-area" v-html="formatText(i.note)"></div>
      </v-alert>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.note-area {
  max-height: 100px; /* 好きな高さに調整 */
  overflow-y: auto; /* 縦スクロール */
  padding: 8px;
  white-space: normal;
}
</style>
