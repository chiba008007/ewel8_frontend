<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits } from "vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const props = defineProps<{
  title?: string;
  density?: TVDensity;
  label?: string;
  model?: string;
  type?: string;
  myimage_path?: string;
}>();

const emit = defineEmits<{
  (e: "onUpdate", value: string, name: string | undefined): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">
      {{ props.title }}
    </v-col>
    <v-col sm="1">
      <img
        :width="100"
        aspect-ratio="16/9"
        cover
        v-if="props.myimage_path"
        :src="props.myimage_path"
      />
    </v-col>
    <v-col sm="8" class="pa-1 border-sm">
      <v-file-input
        accept="image/jpeg"
        :label="props.label"
        variant="outlined"
        :density="props.density"
        hide-details="auto"
        @update:modelValue="emit('onUpdate', $event, props.type)"
      ></v-file-input>
      <p class="ma-0 pa-0 text-caption">
        ※幅240ピクセル、高さ80ピクセル、ファイルサイズ10kbyte程度
      </p>
    </v-col>
  </v-row>
</template>
