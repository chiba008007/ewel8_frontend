<script setup lang="ts">
import ComponentTextField from "../components/TextFieldView.vue";

interface Props {
  title?: string;
  class?: string;
  value?: string;
  post1?: string;
  post2?: string;
  hideDetails?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  class: "",
  value: "",
  post1: "",
  post2: "",
  hideDetails: false,
  color: "bg-primary",
});

const getPost = (type: number) => {
  let tmp = props.value?.split("-")[type];
  return tmp;
};
const onblur1 = (text: string) => {
  emit("onBlur", text, "post1");
};
const onblur2 = (text: string) => {
  emit("onBlur", text, "post2");
};
const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm blue d-flex align-center pl-2"
      :class="props.color"
      >{{ props.title }}</v-col
    >
    <v-col sm="9" class="pa-1 border-sm">
      <v-row>
        <v-col cols="2" class="d-flex">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
            :value="getPost(0)"
            :maxlength="3"
            @onBlur="(e) => onblur1(e)"
          />
          <p class="mt-2 pl-4">-</p>
        </v-col>
        <v-col cols="3">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
            :value="getPost(1)"
            :maxlength="4"
            @onBlur="(e) => onblur2(e)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
