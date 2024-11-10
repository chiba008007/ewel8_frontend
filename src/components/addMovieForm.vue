<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits, ref } from "vue";
import TextFieldView from "./TextFieldView.vue";

const props = defineProps<{
  title?: string;
  hideDetails?: boolean | "auto";
  color?: string;
  items?: object | any;
  value?: number | string;
}>();

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
  (e: "onClick", value: boolean): void;
  (e: "onChange", value: number): void;
  (e: "onURL", value: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <v-radio-group hide-details="auto" :model-value="props.value" row>
        <v-radio
          v-for="item in items"
          :key="item.key"
          :value="item.key"
          :label="item.text"
          @change="() => emit('onChange', item.key)"
        >
          <template v-slot:label v-if="item.key == 1">
            {{ item.text }}
            <TextFieldView
              messages="動画のURL"
              class="w500"
              @onBlur="(e) => emit('onURL', e)"
            ></TextFieldView>
          </template>
        </v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>
<style type="text/css">
.w500 {
  width: 500px;
  margin-left: 10px;
}
</style>
