<script setup lang="ts">
import ButtonView from "./ButtonView.vue";

const emit = defineEmits<{
  (e: "onClick", id: number): void;
}>();

const props = defineProps<{
  coded?: string | undefined;
  starttime?: string | undefined | any;
  endtime?: string | undefined | any;
  id?: number;
  level?: string;
  lv?: string;
}>();

const onclick = (id: number | undefined) => {
  emit("onClick", id as number);
};
</script>
<template>
  <td class="text-center">
    <ButtonView
      :text="props.endtime"
      variant="text"
      density="compact"
      @onClick="onclick(props.id)"
      v-if="props.endtime"
      class="bg-blue"
    ></ButtonView>
    <p v-else-if="props.starttime">受検中</p>
  </td>
</template>
