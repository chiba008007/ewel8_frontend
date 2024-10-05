<script setup lang="ts">
import { defineProps } from "vue";
import ComponentImg from "@/components/imgView.vue";

const props = defineProps<{
  logoSrc: string;
  customerName: string;
  examName: string;
}>();
</script>

<template>
  <v-container fluid>
    <v-row class="pa-4 align-center bg-white">
      <v-col md="1" cols="3">
        <ComponentImg :maxHeight="50" :src="props.logoSrc"></ComponentImg>
      </v-col>
      <v-col class="text-h6 pl-2 font-weight-bold" md="11" cols="9">{{
        props.customerName
      }}</v-col>
    </v-row>
  </v-container>
  <div class="text-h6 font-weight-bold text-center">{{ props.examName }}</div>
</template>
