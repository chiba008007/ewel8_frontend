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
}>();

//const model = ref<boolean>(true);

const emit = defineEmits<{
  (e: "onUpdate", value: string, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">
      {{ props.title }}
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <v-file-input
        :label="props.label"
        variant="outlined"
        :density="props.density"
        hide-details="auto"
        @update:modelValue="(e:any, type:any) => emit('onUpdate', e, type ?? '')"
      ></v-file-input>
      <p class="ma-0 pa-0 text-caption">
        ※幅240ピクセル、高さ80ピクセル、ファイルサイズ10kbyte程度
      </p>
    </v-col>
  </v-row>
</template>
