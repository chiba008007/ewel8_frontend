<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import UserApiService from "@/services/UserApiService";
import { useRouter } from "vue-router";
import ButtonView from "./ButtonView.vue";

const emit = defineEmits<{
  (e: "onClick", id: number): void;
}>();

const props = defineProps<{
  coded?: string | undefined;
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
      v-if="endtime"
      class="bg-blue"
    ></ButtonView>
  </td>
  <td class="text-center">{{ level }}</td>
  <td class="text-center">{{ lv }}</td>
</template>
