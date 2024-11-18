<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { d_Path } from "@/plugins/const";
import { useStoreUser } from "../store/user";

import ButtonView from "@/components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import UserApiService from "@/services/UserApiService";
import TestApiService from "@/services/TestApiService";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();

const tmpid = route.path.replace(/[^0-9]/g, "");
const ex = route.path.split("/");
const testid = ex[2];
const examid = ex[3];
console.log(ex[2]);
console.log(ex[3]);
// const userdata = user.userdata;
// console.log(user.userdata);
</script>
<template>
  <v-row>
    <v-col class="ma-1"> aaa </v-col>
  </v-row>
</template>
<style lang="scss"></style>
