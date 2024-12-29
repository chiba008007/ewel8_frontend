<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentImg from "@/components/imgView.vue";

const emit = defineEmits<{
  (e: "onClick"): void;
}>();

const props = defineProps<{
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  image?: string;
}>();
</script>
<template>
  <v-card>
    <v-card-text>
      {{ props.text1 }}
    </v-card-text>
    <v-card-text class="text-center">
      {{ props.text2 }}
    </v-card-text>
    <v-card-text class="text-center">
      {{ props.text3 }}
    </v-card-text>
    <ComponentImg
      v-if="props.image"
      :maxHeight="140"
      :src="require('@/assets/exam/pfs/' + props.image)"
    ></ComponentImg>
    <v-card-text class="text-center">
      {{ props.text4 }}
    </v-card-text>
  </v-card>
</template>
