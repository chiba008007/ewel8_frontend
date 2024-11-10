<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";

const router = useRouter();
const user = useStoreUser();
const userdata = user.userdata as any;
const id = userdata.id;

const route = useRoute();
const regex = /(\d+)(?!.*\d)/;
const isPortal = ref(route.path.match(regex));
const paramId = ref();
paramId.value = isPortal.value ? (isPortal.value[0] as unknown) : 0;
const pageClickMove = (pagename: string) => {
  router.push(router.resolve({ name: pagename }).href);
};
const pageClickMoveParam = (pagename: string, id: number) => {
  router.push(router.resolve({ name: pagename, params: { id: id } }).href);
};
</script>
<template>
  <v-sheet width="98%">
    <div class="d-flex flex-row justify-left pl-2 pr-5 pb-2">
      <ComponentButton
        text="検査登録"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25"
        @onClick="pageClickMoveParam('testAdd', paramId)"
      ></ComponentButton>
      <ComponentButton
        text="企業情報変更"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('partnerEdit', paramId)"
      ></ComponentButton>
      <ComponentButton
        text="ダウンロード"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('partnerEdit', paramId)"
      ></ComponentButton>
      <ComponentButton
        text="重み付けマスタ登録"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('partnerEdit', paramId)"
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
